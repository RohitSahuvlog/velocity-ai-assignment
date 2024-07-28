const Poll = require('../models/Poll');
const User = require('../models/User');

exports.createPoll = async (req, res) => {
    const { question, options } = req.body;
    try {
        const poll = await Poll.create({
            question,
            options,
            votes: options.map(option => ({ option, count: 0 })),
            createdBy: req.user.id,
        });
        await User.findByIdAndUpdate(req.user.id, { $push: { createdPolls: poll._id } });
        res.status(201).json(poll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.votePoll = async (req, res, io) => {
    if (!req.body || !req.body.option) {
        return res.status(400).json({ error: 'Option is required' });
    }
    const { option } = req.body;
    try {
        const poll = await Poll.findById(req.params.id);
        const vote = poll.votes.find(vote => vote.option === option);
        if (vote) {
            vote.count += 1;
            await poll.save();
            await User.findByIdAndUpdate(req.user.id, { $push: { votedPolls: poll._id } });
            io.emit('pollUpdated', poll);
            res.json(poll);
        } else {
            res.status(400).json({ error: 'Invalid option' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        res.json(poll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPolls = async (req, res) => {
    try {
        const poll = await Poll.find({});
        res.json(poll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}
exports.getPollResults = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        res.json(poll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
