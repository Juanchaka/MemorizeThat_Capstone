import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';


dotenv.config();
const app = express();

const corsOptions = {
    origin: [process.env.DEV_FRONTEND_URL, process.env.PROD_FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

app.use('/api', apiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;