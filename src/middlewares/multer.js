import cloudinaryModule from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  URL: process.env.CLOUDINARY_URL,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contacts',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

export const upload = multer({ storage: storage });
