const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.getLogin = function(req, res) {
    res.render('login', {
        title: 'Авторизация',
    })
}

module.exports.getRegister = function(req, res) {
    res.render('register', {
        title: 'Регистрация',
    })
}

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //Пользователь существует, проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            //Пароли совпадают, генерация токена
            const token = jwt.sign({
                userId: candidate._id,
                email: candidate.email,
            }, keys.jwt, {expiresIn: 3600})

            res.status(200).json({
                token: `Bearer ${token}`,
                message:'Авторизация прошла успешно'
            })
            // res.status(200)
            // res.render('login', {
            //     title: 'Авторизация',
            //     token: `Bearer ${token}`
            // })
        } else {
            //Пароли не совпадают
            res.status(401)
            res.render('login', {
                title: 'Авторизация',
                message: 'Неверный пароль. Попробуйте снова'
            })
        }
    } else {
        //Пользователя нет, ошибка
        res.status(404)
        res.render('login', {
            title: 'Авторизация',
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Пользователь с таким email существует
        res.status(409)
        res.render('register', {
            title: 'Регистрация',
            message: 'Этот email занят'
        })
    } else if (req.body.password != req.body.confirm) {
        //Пароли не совпадают
        res.status(409)
        res.render('register', {
            title: 'Регистрация',
            message: 'Пароли не совпадают'
        })
    } else {
        //email не занят, пароли совпадают, пользователя можно создать
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            fullname: req.body.name + ' ' + req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        await user.save()
        res.status(201)
        res.redirect('/login')
    }
}