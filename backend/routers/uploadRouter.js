import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res) => {
    try {
        const CLOUDINARY_CLOUD_NAME = "theartoffilms";
        const CLOUDINARY_API_SECRET = "u9PT2614sk7pwSpATGDQvWiVhg0";
        const CLOUDINARY_API_KEY = "563822985559768";

        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        const result = await streamUpload(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

uploadRouter.post("/media", async (req, res) => {
    try {
        let media;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json("No files were uploaded.");
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        media = req.body.media;
        const __dirname = path.resolve();

        uploadPath = path.join(__dirname, "/uploads") + media.name;

        // Use the mv() method to place the file somewhere on your server
        media.mv(uploadPath, function (err) {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ message: "File uploaded!", uploadPath });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});
export default uploadRouter;
