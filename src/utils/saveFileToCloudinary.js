import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';
import { env } from './env.js';

console.log(CLOUDINARY);
console.log('CLOUD_NAME:', env('CLOUDINARY_CLOUD_NAME'));
console.log('API_KEY:', env('CLOUDINARY_API_KEY'));
console.log('API_SECRET:', env('CLOUDINARY_API_SECRET'));
console.log('URL:', env('CLOUDINARY_URL'));

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
