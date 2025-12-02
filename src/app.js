import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});