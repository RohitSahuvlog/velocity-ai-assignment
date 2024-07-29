const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const setupSocket = require('./socket');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');


require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formidable({
    multiples: true,
}));


// Set io on the app instance
app.set('io', io);
app.get("/test", function (req, res) {
    res.send("Hello World");
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/polls', require('./routes/pollRoutes')(io));
app.use('/api/comments', require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
