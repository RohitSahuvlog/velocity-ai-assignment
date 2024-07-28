const express = require('express');
const { createPoll, votePoll, getPoll, getPollResults, getAllPolls } = require('../controllers/pollController');

const router = express.Router();

module.exports = (io) => {
    const authMiddleware = require('../middleware/authMiddleware');

    router.post('/vote/:id', authMiddleware, (req, res) => {
        votePoll(req, res, io);
    });
    router.post('/', authMiddleware, (req, res) => {
        createPoll(req, res, io);
    });
    router.post('/:id/vote', authMiddleware, (req, res) => {
        votePoll(req, res, io);
    });
    router.get('/:id', getPoll);
    router.get('/:id/results', getPollResults);
    router.get('/', getAllPolls);

    return router;
};
