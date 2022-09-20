const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Pets',
    public_id: (req, file) => `${file.fieldname}-${uuidv4()}`,
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = /jpeg|jpg|png/;
  const valid = allowTypes.test(file.mimetype);

  if (valid) {
    cb(null, true);
  } else {
    cb({
      message: 'Unsupported format',
      statusCode: 400,
    });
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000 } });

module.exports = upload;
