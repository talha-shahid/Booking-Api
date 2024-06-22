import express from 'express';
// import { getUsers } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import role from '../middlewares/role.js';
import { createUser, getAllUsers } from '../controllers/userController.js';
import { createAgent } from '../controllers/agentController.js';
import { login, logout, newUser } from '../controllers/user.js';


const router = express.Router();


router .post('/new-user', newUser);
router.post('/login', login);
router.get('/logout', logout);
router.get('/users', getAllUsers);

// router.get('/users', auth, role(['REGULAR', 'ADMIN']), getUsers);

// router.get('/agents', auth, role(['ADMIN']), getUsers);

router.post('/create-agent', createAgent);

export default router;
