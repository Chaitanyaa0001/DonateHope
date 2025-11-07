import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/DB.js';
import cookieParser from 'cookie-parser';
import authroutes from './routes/auth.route.js';
import adminroutes from './routes/admin.route.js';
import monitorroutes from './routes/monitor.route.js';
import userroutes from './routes/user.route.js';
import { restartAllMonitorJobs } from './utils/monitorCron.js';
import './config/cloudinary.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5201;

connectDB();
app.use(cors({
  origin:   process.env.FRONTEN_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
app.use('/api/admin', adminroutes);
app.use('/api/monitor', monitorroutes);
app.use('/api/users', userroutes);


app.get('/', (req, res) => {
  res.send('Donation Platform API is running.');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await restartAllMonitorJobs();
});
