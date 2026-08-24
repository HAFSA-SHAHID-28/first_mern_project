import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';


const app = express();
dotenv.config();
dbConnection();

///// middleware
app.use(express.json());
app.use(cors());


////////  routes

app.use('/api/auth', authRoutes)


app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));
