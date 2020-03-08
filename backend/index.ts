import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from 'router';
// import express from 'express';
import multer from 'multer';
import HttpStatus from "http-status-codes";

const uploadData = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const a = req.body;
        console.log(a);
        return res.status(HttpStatus.OK).send({"messages": a});
    } catch (error) {
        next(error);
    }
};

const upload = multer({dest: '/uploads'});
dotenv.config();

const startServer = () => {
    let app = express();
    app.use(cors());
    app.use(express.json());
    app.post('api/path-db', upload.single('avatar'), uploadData);
    app.listen(process.env.PORT, () => {
        console.log("I finally did it");
    })
};
startServer();