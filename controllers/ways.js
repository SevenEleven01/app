const Way = require('../models/Way')

module.exports.getAll = async function(req, res) {
    const ways = await Way.find({}).sort({"number": 1})

    res.render('index', {
        title: 'Список маршрутов',
        ways
    })
}

module.exports.filter = async function(req, res) {
    let ways = await Way.find({}).sort({"number": 1})

    if (req.body.filter == null || req.body.filter == "" || +req.body.filter == 0) {
        res.render('index', {
            title: 'Список маршрутов',
            ways
        })
    } else if (req.body.filter) {
        let ways = await Way.find({"number": req.body.filter})

        res.render('index', {
            title: 'Список маршрутов',
            ways
        })
    }
}

module.exports.getCreate = function(req, res) {
    res.render('create', {
        title: 'Добавить маршрут',
    })
}

module.exports.create = async function(req, res) {
    if(!req.body) return res.sendStatus(400)
    console.log(req.body)
    
    const way = new Way({
        number: req.body.number,
        name: req.body.name,
        way: req.body.way
    })

    await way.save()
    res.redirect('./')
}