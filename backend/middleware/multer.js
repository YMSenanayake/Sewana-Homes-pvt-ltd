import multer from "multer"

// Use memory storage so uploaded file is available as buffer (safer for Cloudinary upload streams)
export const upload = multer({ storage: multer.memoryStorage() })