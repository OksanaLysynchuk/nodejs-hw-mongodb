import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  url: CLOUDINARY.URL,
});

export const saveFileToCloudinary = (file) => {
  return cloudinary.UploadStream.upload(file);
};
