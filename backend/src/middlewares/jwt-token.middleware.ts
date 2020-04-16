import express from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {UserDoc, User} from "../models/database/user.model";
import {RequestWithUser} from "./interfaces";

export default (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.headers['token'] || req.body['token'] || req.params['token'];
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({messages: ["Permission denied"]});
        }

        jwt.verify(token, process.env.JWT_TOKEN, (err: Error, decoded) => {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json({messages: ["Token is not valid"]});
            } else {
                const {email}: any = decoded;
                const user: UserDoc | null = User.findOne({email: email});
                if (!user) {
                    return res.status(HttpStatus.UNAUTHORIZED).json({messages: ["Permission denied"]});
                }
                req.user = user;
                next();
            }

        })

    } catch (error) {

        next(error);
    }

}