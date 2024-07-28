const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: [{ option: String, count: { type: Number, default: 0 } }],
    likes: { type: Number, default: 0 },
    comments: [{
        user_id: { type: String, required: true },
        username: { type: String, required: true },
        comment: { type: String, required: true }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
