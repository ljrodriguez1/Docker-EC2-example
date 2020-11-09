const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema ({
        name: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, required: true },
        group_id: {type: Schema.Types.ObjectId, required: true},
        group_name: {type: String, required: true },
        messageUpdate: {type: String, default: null}

});


module.exports = mongoose.model('Message', Message)
