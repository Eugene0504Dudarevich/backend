import { Request, Response } from "express";
import { registerUser } from "../services";

export const register = async (request: Request, response: Response) => {
    try {
        const { fullName, email, phoneNumber, password } = request.body;

        const user = await registerUser(fullName, email, password, phoneNumber)

        response.status(201).json({
            message: "User registered successfully",
            userId: user.id
        });
    } catch (error) {
        response.status(400).json({ error: (error as Error).message })
    }
}