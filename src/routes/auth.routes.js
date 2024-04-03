import { Router } from 'express';
import {
	login,
	register,
	logout,
	profile,
	verifyToken,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middeware.js';
import { loginSchema, registerSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify', verifyToken);

export default router;
