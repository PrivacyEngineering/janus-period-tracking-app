import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'role']),
    },
    secret,
    {
      expiresIn: '20m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'role']),
    },
    secret,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1;
  let userRole = "";
  try {
    const { user: { id , role} } = jwt.verify(refreshToken, SECRET);
    userId = id;
    userRole = role;
  } catch (err) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (name, password, models, SECRET) => {
  const localAuth = await models.LocalAuth.findOne({ where: { name }, raw: true });
  if (!localAuth) {
    // user with provided email not found
    throw new Error('Invalid login');
  }
  // change to hash !!
  const valid = await bcrypt.compare(password, localAuth.password);

  if (!valid) {
    // bad password
    throw new Error('Invalid login');
  }

  const user = await models.User.findOne({ where: { id: localAuth.user_id }, raw: true });

  const [token, refreshToken] = await createTokens(user, SECRET);

  return {
    token,
    refreshToken,
  };
};