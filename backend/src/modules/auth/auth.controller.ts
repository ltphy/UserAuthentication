import express from 'express';
import httpStatus from 'http-status-codes';
import authService from './auth.services';
import {User, UserDoc} from "../../models/database/user.model";
import bcrypt from 'bcrypt';
import authConstant from './auth.constants';

const signIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            //logg here
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['email, password are required']});
        }
        console.log("email", email);
        if (!authService.validateEmail(email)) {
            //log here
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Invalid Email']});
        }
        const user: UserDoc | null = await User.findOne({email: email});
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is not available']});
        }
        const hashedPassword: string = user.hashedPassword;
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Password is not valid']});
        }
        return res.status(httpStatus.OK).json({messages: ['Login Successfully']});


    } catch (error) {
        return next(error);
    }
};

const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const name = req.body['username'];
        const email = req.body['email'];
        const password = req.body['password'];
        console.log(email);
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
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is not available']});
        }
        const user: UserDoc | null = await User.findOne({email: email});
        if (user) {
            return res.status(httpStatus.UNAUTHORIZED).json({messages: ['Email is  available']});
        }
        const hashedPassword = await bcrypt.hash(password, authConstant.saltRounds);
        const token = await authService.getToken(email);
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.hashedPassword = hashedPassword;

        const retUser: UserDoc|null = await newUser.save();
        if(!retUser) {
            return res.status(httpStatus.BAD_REQUEST).json({messages: ['Unable to save to database']});
        }

        return res.status(httpStatus.OK).json({
                token: token,
                messages: ["Login successfully"],
                userInfo: {name: retUser.name, email: retUser.email}
            }
        )

    } catch (error) {
        return next(error);
    }
};

// const getUserLoginInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     try {
//         if(req)
//     }catch(error) {
//         return next(error);
//     }
// };
export default {
    signIn,
    signUp,
    // getUserLoginInfo
}