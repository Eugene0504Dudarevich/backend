import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/auth";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Authentication service is running on port ${PORT}`);
});
