import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import  User from "../models/User";

const router = Router();

router.post("/register", async (request: Request, response: Response) => {
    try {
        const { fullName, email, phoneNumber, password } = request.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(400).json({ message: "User with this email already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, phoneNumber, password: hashedPassword });
        await user.save()

        response.status(200).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error("Registration error:", error)
        response.status(500).json({ message: "Server error" })
    }
})

export default router;