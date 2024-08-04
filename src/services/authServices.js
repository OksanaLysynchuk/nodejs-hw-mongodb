import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/userModel.js';
import Session from '../db/models/sessionModel.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constants/index.js';

export const createUser = async (user) => {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
};

export const loginUser = async (email, password) => {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(password, maybeUser.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: maybeUser._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await Session.create({
    userId: maybeUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
};

export const logoutUser = async (sessionId) => {
  return await Session.deleteOne({ _id: sessionId });
};

<<<<<<< HEAD:src/services/authServices.js
=======


>>>>>>> ebf50995590a30a5fe27c2c63175435d2bfb6bc9:src/services/auth.js
const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};
