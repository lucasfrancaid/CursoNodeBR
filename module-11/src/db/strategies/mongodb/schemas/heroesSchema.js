const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = Mongoose.model('heroes', schema)