import createHttpError from 'http-errors';
import Session from '../db/models/sessionModel.js';
import User from '../db/models/userModel.js';

export const authenticate = async (req, res, next) => {
  console.log('Authorization header:', req.headers.authorization);

  if (typeof req.headers.authorization !== 'string') {
    return next(createHttpError(401, 'Access token expired'));
  }

  const [bearer, accessToken] = req.headers.authorization.split(' ', 2);
  console.log('Bearer:', bearer, 'Access Token:', accessToken);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  try {
    const session = await Session.findOne({ accessToken });
    console.log('Session:', session);

    if (session === null) {
      return next(createHttpError(401, 'Session not found'));
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findOne({ _id: session.userId });
    console.log('User:', user);

    console.log('User ID from DB:', user._id);

    if (user === null) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    console.log('Authenticated User:', req.user);

    next();
  } catch (error) {
    next(createHttpError(500, 'Server error'));
  }
};
