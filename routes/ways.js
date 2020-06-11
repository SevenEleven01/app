const { Router } = require('express')
const router = Router()
const controller = require('../controllers/ways')
const passport = require('passport')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', /*passport.authenticate('jwt', {session: false}), */urlencodedParser, controller.getAll)

router.get('/create', passport.authenticate('jwt', {session: false}), controller.getCreate)

router.post('/create', passport.authenticate('jwt', {session: false}), urlencodedParser, controller.create)

router.post('/', /*passport.authenticate('jwt', {session: false}), */urlencodedParser, controller.filter)

module.exports = router