const app = require('./app')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const PORT = process.env.PORT || 3000

async function start() {
    try {
      await mongoose.connect(keys.mongoURI, {
          useNewUrlParser: true,
          useFindAndModify: false
      })

      app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`)
      })
    } catch (e) {
        console.log(e)
    }
}

start()