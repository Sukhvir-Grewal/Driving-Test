import User from "./User";
import connectDB from "./mongo";
import bcrypt from "bcryptjs";

connectDB();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword,
                totalQuizTaken: 0,
                totalQuizPassed: 0,
                totalQuizFailed: 0,
            });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
