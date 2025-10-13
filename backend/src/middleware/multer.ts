// src/middleware/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: "donatehope/campaigns",
      format: file.mimetype.split("/")[1], // auto-detect format
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 800, height: 600, crop: "limit" }],
    };
  },
});

const upload = multer({ storage });
export default upload;
