import express from 'express';
import {UserDoc} from "../models/database/user.model";

export interface RequestWithUser extends express.Request {
    user: UserDoc;
}