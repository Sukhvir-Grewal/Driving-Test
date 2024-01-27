import multer from "multer";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";
import User from "./auth/User";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const multerUpload = upload.single("file");

            multerUpload(req, res, async function (err) {
                if (err) {
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }

                const buffer = req.file.buffer;
                const username = req.body.username;

                try {
                    const tempFilePath = path.join(__dirname, "tempFile");

                    fs.writeFileSync(tempFilePath, buffer);

                    const result = await cloudinary.uploader.upload(
                        tempFilePath,
                        {
                            resource_type: "auto",
                        }
                    );

                    fs.unlinkSync(tempFilePath);

                    const updateUserProfileImage = await User.findOneAndUpdate(
                        { username: username },
                        {
                            $set: {
                                profileImage: {
                                    publicID: result.public_id,
                                    imageUrl: result.secure_url,
                                },
                            },
                        },
                        { new: true }
                    );

                   
                    res.status(200).json({
                        publicID: result.public_id,
                        imageUrl: result.secure_url,
                    });
                } catch (error) {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
