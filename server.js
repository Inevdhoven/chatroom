import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('public')));

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});