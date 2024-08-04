import * as UserServices from '../services/authServices.js';

export const register = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = await UserServices.createUser(user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: newUser,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const session = await UserServices.loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logout = async (req, res) => {
  if (typeof req.cookies.sessionId === 'string') {
    await UserServices.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

<<<<<<< HEAD:src/controllers/authController.js
=======


>>>>>>> ebf50995590a30a5fe27c2c63175435d2bfb6bc9:src/controllers/auth.js
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refresh = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
