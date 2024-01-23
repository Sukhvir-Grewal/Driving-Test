import Cookies from "js-cookie";
import User from "./User";
import connectDB from "./mongo";
import { useAtom } from "jotai";
import { userData } from "@/jotaiStorage";

connectDB();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { newName } = req.body;
        const { old } = req.body;
        console.log("stored name", old);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { username: old },
                { $set: { username: newName } },
                { new: true } // to get the updated document
            );

            res.status(200).json({
                message: "Update successful",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error during Updating",
                error: error.message,
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
