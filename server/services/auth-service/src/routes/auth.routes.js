import express from 'express';
import { login, register,getUserById,verifyOTP } from '../services/auth.service.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.get('/users/:id', getUserById);
router.post('/verify-otp', verifyOTP);

export default router;
