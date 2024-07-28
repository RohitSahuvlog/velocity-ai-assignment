const socketIO = require('socket.io');
const Poll = require('./models/Poll');
const socketAuthMiddleware = require('./middleware/jsonwebtoken');
const User = require('./models/User');

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });


    io.use(socketAuthMiddleware);

    io.on('connection', (socket) => {
        console.log("connection", socket.user.id);
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        socket.on('createPoll', async (data) => {
            const { question, options } = data;
            try {
                const poll = await Poll.create({
                    question,
                    options,
                    votes: options.map(option => ({ option, count: 0 })),
                    createdBy: socket.user.id,
                });
                await User.findByIdAndUpdate(socket.user.id, { $push: { createdPolls: poll._id } });
                io.emit('pollCreated', poll);
            } catch (error) {
                console.error(error.message);
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('updateLike', async (data) => {
            const poll = await Poll.findById(data.pollId);
            poll.likes += 1;
            await poll.save();
            io.emit('likeUpdated', { pollId: poll._id, likes: poll.likes });
        });

        socket.on('addComment', async (data) => {
            const poll = await Poll.findById(data.pollId);
            poll.comments.push({
                user_id: socket.user.id,
                username: socket.user.username,
                comment: data.comment,
            });
            await poll.save();
            console.log(poll, "comment");
            const updatedPoll = await Poll.findById(data.pollId).populate('createdBy');

            io.to(updatedPoll.createdBy._id.toString()).emit('newVote', {
                pollId: updatedPoll._id,
                question: updatedPoll.question,
                message: `${socket.user.username} commented on your poll`,
            });
            io.emit('commentAdded', { pollId: updatedPoll._id, comments: updatedPoll.comments });
        });

        socket.on('commentUpdate', (data) => {
            io.emit('commentUpdate', data);
        });

    });

    return io;

};

module.exports = setupSocket;
