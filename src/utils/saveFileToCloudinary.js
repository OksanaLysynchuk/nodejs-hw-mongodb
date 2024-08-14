import * as fs from 'fs/promises';

import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';

console.log(CLOUDINARY);

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  url: CLOUDINARY.URL,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
