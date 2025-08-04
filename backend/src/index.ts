import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/DB.ts';
import cookieParser from 'cookie-parser';
import authroutes from './routes/auth.route.ts'

connectDB();


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Donation Platform API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
