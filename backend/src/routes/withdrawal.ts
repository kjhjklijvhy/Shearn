import { Router } from 'express';
import { verifyAuth } from '../middleware/auth.js';

const router = Router();

router.use(verifyAuth);

// Routes will be implemented

export default router;
