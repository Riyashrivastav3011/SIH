import { createStudentProfile } from '../controllers/studentprofile.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination:(req , file , cb) => {
        cb(null , path.join(__dirname, "../uploads"));
    },
    filename:(req , file , cb) => {
       cb(null , file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC and DOCX files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

router.post('/profile', verifyToken , upload.single("resume") , createStudentProfile);


export default router;