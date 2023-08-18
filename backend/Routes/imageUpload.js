import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();
// Configuring Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //-------
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Define a route to handle image uploads
router.post('/upload', upload.single('image'), (req, res) => {
  console.log('inside upload image');
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = req.file.filename;
  res.json({ imageUrl });
});
export default router;
