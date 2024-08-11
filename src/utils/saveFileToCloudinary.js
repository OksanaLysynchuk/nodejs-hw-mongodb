import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY.CLOUDINARY_API_SECRET,
  url: CLOUDINARY.CLOUDINARY_URL,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
