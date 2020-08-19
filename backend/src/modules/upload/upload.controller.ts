import express from 'express';
import HttpStatus from 'http-status-codes'

const uploadData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const files = req.file;
        console.log(files);

        return res.status(HttpStatus.OK).send({"messages": files});
    } catch (error) {
        next(error);
    }

};
export default {
    uploadData
}