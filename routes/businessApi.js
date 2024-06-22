import express from 'express';
import { businessScheduler } from '../controllers/schedulerController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/scheduler', auth, businessScheduler);

export default router;