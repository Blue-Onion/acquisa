import { signUp } from '#controllers/auth.controller.js';
import express from 'express';


const router = express.Router();

// Define auth routes here (e.g., login, register, logout)
router.post('/sign-up', signUp);
router.post('/sign-in', (req, res) => {
  res.send('User signed in');
});
router.post('/sign-out', (req, res) => {
  res.send('User signed out');
});


export default router;
