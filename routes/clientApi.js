import express from 'express';
import { getSchedule, createBooking, deleteBooking } from '../controllers/bookingController.js';
import auth from '../middlewares/auth.js';
import role from '../middlewares/role.js';

const router = express.Router();

router.get('/scheduler', auth, role(['REGULAR', 'ADMIN']), getSchedule);
router.post('/booking', auth, role(['ADMIN']), createBooking);
router.delete('/booking/:id', auth, role(['ADMIN']), deleteBooking);

export default router;
