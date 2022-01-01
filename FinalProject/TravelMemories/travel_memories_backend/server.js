/* Author Dhrumil Amish Shah */
const express = require('express');
const http = require('http');
const cors = require('cors');

const travelMemoryPostRouter = require('./src/routes/travelMemoryPostRoute');
const travelMemoryPostCommentRouter = require('./src/routes/travelMemoryPostCommentRoute');
const travelMemoryPostRatingRouter = require('./src/routes/travelMemoryPostRatingRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'jade');

app.use('/travelmemorypost', travelMemoryPostRouter);
app.use('/travelmemorypost/comment', travelMemoryPostCommentRouter);
app.use('/travelmemorypost/rating', travelMemoryPostRatingRouter);

app.use(function (req, res, next) {
    res.status(404).send({ message: "URL not found", success: false });
});

const port = process.env.PORT || 3001;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("Listening", onListening);

function onListening() {
    const address = server.address();
    const port = address.port;
    console.log("Server started on port : " + port);
}