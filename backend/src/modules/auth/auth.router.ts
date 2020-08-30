import {Router} from 'express';
import middleware from '../../middlewares';
import authController from './auth.controller'

const router = Router({});
router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);
router.get('/user-info', authController.getUserLoginInfo);

export default router;