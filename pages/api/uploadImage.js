import multer from "multer";
import User from "./auth/User";
import { Readable } from "stream";
import { v2 as cloudinaryV2 } from "cloudinary";
import connectDB from "./auth/mongo";

connectDB()

cloudinaryV2.config({
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

                try {
                    const stream = cloudinaryV2.uploader.upload_stream(
                        {
                            resource_type: "auto",
                        },
                        async (error, result) => {
                            if (error) {
                                console.error("Error uploading to Cloudinary:", error);
                                res.status(500).json({ error: "Internal Server Error" });
                                return;
                            }

                            console.log(result)
                            
                            const updateUserProfileImage = await User.findOneAndUpdate(
                                { username: req.body.username },
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
                        }
                    );

                    const readableStream = new Readable();
                    readableStream.push(buffer);
                    readableStream.push(null);

                    readableStream.pipe(stream);
                } catch (error) {
                    console.error("Error:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                }
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
