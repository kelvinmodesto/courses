const Mongoose=  require('mongoose')
const heroiSchema = new Mongoose.Schema({
    source: {
        type: Number,
        required: true
    },
    destination: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

//mocha workaround
module.exports = Mongoose.models.herois || Mongoose.model('herois', heroiSchema)