import express from 'express';

const router = express.Router();

// Define auth routes here (e.g., login, register, logout)
router.post('/sign-up', (req, res) => {
  res.send('User signed up');
});
router.post('/sign-in', (req, res) => {
  res.send('User signed in');
});
router.post('/sign-out', (req, res) => {
  res.send('User signed out');
});


export default router;
