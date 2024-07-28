const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    const { content } = req.body;
    try {
        const comment = await Comment.create({
            content,
            pollId: req.params.pollId,
            userId: req.user.id,
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ pollId: req.params.pollId }).populate('userId', 'username');
        res.json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
