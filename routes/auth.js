const { Router } = require('express')
const auth = Router()
const controller = require('../controllers/auth')
const User = require('../models/User')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: true})

auth.get('/register', controller.getRegister)

auth.get('/login', controller.getLogin)

auth.post('/register', urlencodedParser, controller.register)

auth.post('/login', urlencodedParser, controller.login)

module.exports = auth