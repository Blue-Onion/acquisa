import { signUp, signIn, signOut } from '#controllers/auth.controller.js';
import express from 'express';


const router = express.Router();

// Define auth routes here (e.g., login, register, logout)
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);


export default router;
