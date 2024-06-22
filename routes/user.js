import express from 'express';
import {getMyProfile, login, logout, newUser} from '../controllers/user.js';
// import {singleAvatar} from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const app = express.Router();

// Define your routes here
app.post('/new', newUser);
app.post('/login', login);


// Protect all routes after this middleware
app.use(isAuthenticated);

app.get('/profile', getMyProfile);

app.get('/logout', logout);

export default app;