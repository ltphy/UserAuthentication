import express from 'express';
import cors from 'cors';
import uploadModule from '../modules/upload';
import authModule from '../modules/auth';
import bodyParser from 'body-parser';

export default (app: express.Application) => {
    // app.get(/ping) to text port
    app.use(express.static(__dirname + "../public"));
    app.get('/ping', (req: express.Request, res: express.Response) => {
        res.send("Ping pong");
    });
    app.enable('trust proxy')
    app.use(cors({origin: '*'}));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));



    // app.use middleware logger
    // app.user(middeware.requestLogger);
    app.use('/api/upload', uploadModule);
    app.use('/api/auth', authModule);
    //unsupported api
    // app.user(middleware.unsupportedApi);
    //app.use(middle.error);
    return app;

    // app.use to validate error not available url
}