
import express from 'express';
import { login, register, updateUser } from '../controllers/authController.js';
import  authentication  from '../middleware/auth.js';


const authRouter = express.Router();



authRouter.route('/register').post(register);
authRouter.route('/login').post( login );
authRouter.route('/updateUser').patch( authentication,   updateUser );


export default authRouter;