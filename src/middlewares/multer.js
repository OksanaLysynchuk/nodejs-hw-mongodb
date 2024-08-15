import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinaryModule from 'cloudinary';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contacts',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `contact-${Date.now()}`,
  },
});

export const upload = multer({ storage: storage });
