import express from 'express';
import { signUp } from '/src/controller/auth.controller.js';



const router = express.Router();

// Define auth routes here (e.g., login, register, logout)
console.log("works");

router.post('/sign-up', signUp);
router.post('/sign-in', (req, res) => {
  res.send('User signed in');
});
router.post('/sign-out', (req, res) => {
  res.send('User signed out');
});


export default router;
