import express from 'express';

import {connectDb} from './utils/features.js';
import dotenv from 'dotenv';
// import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser'; 

// import userRoute from './routes/user.js';
// import chatRoute from './routes/chat.js';
// import { createUser } from './seeders/user.js';


import clientApiRoutes from './routes/clientApi.js';
import businessApiRoutes from './routes/businessApi.js';
import commonApiRoutes from './routes/commonApi.js';



console.log('Server-side code running');

dotenv.config({
    path: './.env'
});

const mongoURL = process.env.MONGO_URL;
const app = express();
const port = 8000;

connectDb(mongoURL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use('/user', userRoute);
// app.use('/app1', app1Route)
// app.use('app2', app2Route);


app.use('/api/client', clientApiRoutes);
app.use('/api/business', businessApiRoutes);
app.use('/api/common', commonApiRoutes);


// app.use(errorMiddleware)

app.listen(process.env.PORT ||  port, () => {
    console.log(`Server is listening on port ${port}`);
});