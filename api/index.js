import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from your frontend
//     credentials: true, // Allow credentials (like cookies) to be sent
// }));


mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to DB")
    app.listen(3000, () => {
        console.log('server running on port 3000...')
    });
    
}).catch((err) => {
    console.log('cannot connect to DB');
});



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ success: false, statusCode, message });
})