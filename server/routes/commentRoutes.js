const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:pollId/comment', authMiddleware, addComment);
router.get('/:pollId/comments', getComments);

module.exports = router;
