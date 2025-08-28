import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/auth";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || '';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/api', authRoutes);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Authentication service is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log("MongoDB connection error:", error)
    });
