import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import multer from 'multer'
import dbConfig from './config/databaseConfig.js';
import authRouter from './routes/authRoutes.js';
import employeeRouter from './routes/employeeRouts.js';
import profileRouter from './routes/profileRoutes.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import leaveRouter from './routes/leaveRouters.js';
import payslipRouter from './routes/payslipsRoutes.js';

dotenv.config()

const app = express();
await dbConfig()
const PORT = process.env.PORT || 5000;

// ======== Middlewares ========
app.use(cors())
app.use(express.json())
app.use(multer().none())

// ======== Routes ==========
app.use('/api/auth', authRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/payslips', payslipRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});