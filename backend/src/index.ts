import express from 'express';
import dotenv from 'dotenv';
import loaders from './loaders';
import socketIO from 'socket.io';

dotenv.config();
const startServer = async () => {
    const app = express();
    await loaders({app});

    app.listen(process.env.PORT || 8080, () => {
        console.log("Listening to port", process.env.PORT || 8080);
    })
};

startServer();