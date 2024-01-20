import User from "./User";
import connectDB from "./mongo";

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

            if (user.password === password) {
                // Successful login
                res.status(200).json({
                    message: "Login successful",
                    userData: user
                });
            } else {
                console.log("Wrong password");
                res.status(401).json({ message: "Wrong password" });
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
