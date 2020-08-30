import express from 'express';
import httpStatus from 'http-status-codes';
import authService from './auth.services';
import {User, UserDoc} from "../../models/database/user.model";
import bcrypt from 'bcrypt';
import authConstant from './auth.constants';
import jwt from 'jsonwebtoken';


const signIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            // logg here
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['email, password are required']});
        }
        if (!authService.validateEmail(email)) {
            // log here
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Invalid Email']});
        }
        const user: UserDoc | null = await User.findOne({email});
        if (!user) {
            console.log("NOT AVIALBL");
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is not available']});
        }
        const hashedPassword: string = user.hashedPassword;
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            console.log("NOT MATCH");
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Password is not valid']});
        }
        const token = await authService.getToken(email);
        return res.status(httpStatus.OK).json({
            messages: ['Login Successfully'],
            token,
            userInfo: {name: user.name, email: user.email}

        });


    } catch (error) {
        return next(error);
    }
};

const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        console.log(name);
        console.log(email);
        console.log(password);
        if (!name) {
            return res.status(httpStatus.BAD_REQUEST).json({messages: ['Name is not available']});
        }
        if (!email) {
            return res.status(httpStatus.BAD_REQUEST).json({messages: ['Email is not available']});
        }
        if (!password) {
            return res.status(httpStatus.BAD_REQUEST).json({messages: ['password is not available']});
        }
        if (!authService.validateEmail(email)) {
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is not valid']});
        }
        const user: UserDoc | null = await User.findOne({email});
        if (user) {
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is available']});
        }
        const hashedPassword = await bcrypt.hash(password, authConstant.saltRounds);
        const token = await authService.getToken(email);
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.hashedPassword = hashedPassword;

        const retUser: UserDoc | null = await newUser.save();
        if (!retUser) {
            return res.status(httpStatus.BAD_REQUEST).json({messages: ['Unable to save to database']});
        }

        return res.status(httpStatus.OK).json({
                token,
                messages: ["Sign up successfully"],
                userInfo: {name: retUser.name, email: retUser.email}
            }
        )

    } catch (error) {
        return next(error);
    }
};

const getUserLoginInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.body.token || req.params.token || req.headers.token;

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                messages: ['Token is not provided']
            });

        }
        const {data} = await jwt.verify(token, process.env.SECRET);
        if (!data) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                messages: ['Token is not valid']
            });
        }
        const user: UserDoc | null = await User.findOne({email: data});

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                messages: ['Email is no available']
            });
        }
        return res.status(httpStatus.OK).json({
            messages: ['Successfully'],
            userInfo: {
                name: user.name,
                email: user.email,
            }

        });

    } catch (error) {
        return next(error);
    }
};
export default {
    signIn,
    signUp,
    getUserLoginInfo
}