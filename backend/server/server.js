import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();
const app = express();

const corsOptions = {
    origin: ['https://juanchaka.github.io', 'http://localhost:5173'],
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

app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API routes' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;