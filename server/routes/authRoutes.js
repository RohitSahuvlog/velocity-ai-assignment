const express = require('express');
const { register, login, profile, uploadProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const formidable = require('express-formidable');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/upload', authMiddleware, formidable(), uploadProfile);

module.exports = router;
