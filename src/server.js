import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import multer from 'multer'
import dbConfig from './config/databaseConfig.js';

dotenv.config()

const app = express();
await dbConfig()
const PORT = process.env.PORT || 5000;

// ======== Middlewares ========
app.use(cors())
app.use(express.json())
app.use(multer().none())


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});