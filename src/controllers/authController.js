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

export const sendResetEmailController = async (req, res) => {
  try {
    await UserServices.sendResetEmail(req.body.email);

    res.json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error sending reset email',
      error: error.message,
    });
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { password, token } = req.body;

    await UserServices.resetPassword(password, token);

    res.json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error resetting password',
      error: error.message,
    });
  }
};
