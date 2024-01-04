import User from "./User";
import connectDB from "./mongo";

connectDB();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const newUser = new User({ username, password });
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
