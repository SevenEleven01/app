const {Schema, model} = require('mongoose')

const schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    way: {
        type:String,
        required: true
    }
})

module.exports = model('Way', schema)