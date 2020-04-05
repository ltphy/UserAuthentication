import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from 'router';
// import express from 'express';
import multer from 'multer';
import HttpStatus from "http-status-codes";
import loaders from './src/loaders';

const upload = multer({dest: '/uploads'});
dotenv.config();
const host = process.env.API_URL + ":" + process.env.port;
const startServer = () => {
    const app = express();
    loaders({app});

    app.post(`/api/path-db`, upload.single('avatar'), (req, res) => {
        try {
            const a = req.body;
            console.log(a);
            return res.status(HttpStatus.OK).send({"messages": a});
        } catch (error) {
        }
    });
    app.listen(process.env.PORT|| 8080, () => {
        console.log("I finally did it");
    })
};

startServer();