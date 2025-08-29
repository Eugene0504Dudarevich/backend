import prisma from "../db";
import bcrypt from "bcrypt";

export const registerUser = async (fullName: string, email: string, password: string, phoneNumber: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error ("User with this email already exist");

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({ data: {
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        password: hashedPassword,
    }});
}