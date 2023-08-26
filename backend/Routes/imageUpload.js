import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();
// Configuring Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//Checking for valid image type
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  console.log('Inside upload image');
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`,
  });
});
export default router;
