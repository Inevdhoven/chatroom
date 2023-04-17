import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
// import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);
const io = new Server(server);

// app.use(cookieParser());
app.use(express.static(path.resolve('public')));


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat', (data) => {
        console.log(data);
        io.sockets.emit("chat", data);
    });

    socket.on('typing', (inputName) => {
        console.log("Aan het typen");
        socket.broadcast.emit("typing", inputName);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});