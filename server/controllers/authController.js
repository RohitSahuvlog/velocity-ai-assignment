const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('createdPolls').populate('votedPolls');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.UploadUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const result = await cloudinary.uploader.upload(req.file.path);
        user.avatar = result.secure_url;
        user.username = req.body.username;
        user.email = req.body.email;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}