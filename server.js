import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes import
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import testRoute from './routes/testRoute.js';
import cookieParser from 'cookie-parser';
import chatRouter from './routes/chatRoute.js';
import messageRouter from './routes/messageRoute.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the Real Estate API');
});

// Main API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});