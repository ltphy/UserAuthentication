import jwt from 'jsonwebtoken';
import authConstants from './auth.constants';

const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const getToken = async (email: string) => {
    const value = await jwt.sign({data: email}, process.env.SECRET, {expiresIn: authConstants.expiresIn});
    return value;
};

export default {
    validateEmail,
    getToken
}