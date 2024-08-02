import createHttpError from 'http-errors';
import Session from '../db/models/sessionModel.js';
import User from '../db/models/userModel.js';

export const authenticate = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'string') {
    return next(createHttpError(401, 'Access token expired'));
  }

  const [bearer, accessToken] = req.headers.authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findOne({ _id: session.userId });

  if (user === null) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};
