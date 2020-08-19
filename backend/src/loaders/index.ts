import express from 'express';
import startExpress from "./startExpress";
import mongoLoader from "./mongoose";

interface InitExpress {
    app: express.Application;
}

export default async ({app}: InitExpress) => {
    startExpress(app);
    await mongoLoader();
}