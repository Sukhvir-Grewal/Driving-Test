import User from "./auth/User";
import connectDB from "./auth/mongo";

connectDB();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { isPass, username } = req.body;
        try {
            let updatedUser;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let newValForTotal = user.totalQuizTaken + 1;
            let newValForPass = user.totalQuizPassed;
            let newValForFail = user.totalQuizFailed;
            console.log("new value", newValForTotal);

            updatedUser = await User.findOneAndUpdate(
                { username },
                { $set: { totalQuizTaken: newValForTotal } },
                { new: true }
            );

            if (isPass) {
                newValForPass = user.totalQuizPassed + 1;
                updatedUser = await User.findOneAndUpdate(
                    { username },
                    { $set: { totalQuizPassed: newValForPass } },
                    { new: true }
                );
            } else {
                newValForFail = user.totalQuizFailed + 1;
                updatedUser = await User.findOneAndUpdate(
                    { username },
                    { $set: { totalQuizFailed: newValForFail } },
                    { new: true }
                );
            }

            res.status(200).json({
                totalQuizTaken: newValForTotal,
                totalQuizPassed: newValForPass,
                totalQuizFailed: newValForFail,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error during Updating",
                error: error.message,
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
