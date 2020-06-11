const express = require('express')
const passport = require('passport')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser')
const path = require('path')
const wayRoutes = require('./routes/ways')
const authRoutes = require('./routes/auth')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/ways', wayRoutes)
app.use('/api/auth', authRoutes)

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app