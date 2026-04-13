import { Router } from 'express';
import { getMe, register } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post("/register", register);
authRouter.get("/get-me", getMe);

export default authRouter