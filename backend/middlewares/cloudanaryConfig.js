const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder name in Cloudinary
    format: async (req, file) => file.mimetype.split('/')[1], // Keeps the original format
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit (adjust as needed)

  fileFilter: (req, file, cb) => {
    console.log(file.mimetype); // Add this line to check the MIME type

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/avif',
      'image/webp', // Added support for WebP images
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      console.log(`File uploaded: ${file.originalname} with MIME type ${file.mimetype}`);
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Only PNG, JPEG, JPG, GIF, AVIF, and WEBP are allowed.'));
    }
  },
});

module.exports = upload;
