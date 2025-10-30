import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/DB.ts';
import cookieParser from 'cookie-parser';
import authroutes from './routes/auth.route.ts';
import adminroutes from './routes/admin.route.ts';
import monitorroutes from './routes/monitor.route.ts';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5201;

connectDB();
import './config/cloudinary.ts';
import { restartAllMonitorJobs } from './utils/monitorCron.ts';
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
app.use('/api/admin', adminroutes);
app.use('/api/monitor', monitorroutes);


app.get('/', (req, res) => {
  res.send('Donation Platform API is running.');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await restartAllMonitorJobs();
});
