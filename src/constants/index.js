import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000;
export const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const JWT_SECRET = { JWT_SECRET: 'JWT_SECRET' };
export const APP_DOMAIN = { APP_DOMAIN: 'APP_DOMAIN' };

export const TEMPLATE_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  URL: 'CLOUDINARY_URL',
};
