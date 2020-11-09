const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Color = new Schema ({
    color: { type: String, required: true }, 
    user_name: {type: String, required: true},
});

module.exports = mongoose.model('Color', Color);