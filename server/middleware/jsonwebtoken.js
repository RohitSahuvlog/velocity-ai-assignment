const jwt = require('jsonwebtoken');
const User = require('../models/User');

const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }

        try {
            const user = await User.findById(decoded.id);

            if (!user) {
                return next(new Error('User not found'));
            }
            socket.user = user;
            socket.user.id = user.id;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });
};

module.exports = socketAuthMiddleware;
