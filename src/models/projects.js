const Mongoose = requir('mongoose');

const schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        id: Number
    },
    tasks: {
        type: Array
    }
});

module.exports = Mongoose.model('Project', schema);