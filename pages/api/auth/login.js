import User from "./User";
import connectDB from "./mongo";

import bcrypt from "bcryptjs";

connectDB();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user) {
                console.log("No such user exists!");
                return res.status(404).json({ message: "No such user exists" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Successful login

                res.status(200).json({
                    message: "Login successful",
                    userData: user,
                });
            } else {
                console.log("Wrong password");
                res.status(401).json({
                    message: "Wrong username or password",
                    match: false,
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({
                message: "Internal Server Error during login",
                error: error.message,
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
