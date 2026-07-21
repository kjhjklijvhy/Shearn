import { Router } from 'express';
import { verifyAdmin } from '../middleware/auth.js';

const router = Router();

router.use(verifyAdmin);

// Routes will be implemented

export default router;
