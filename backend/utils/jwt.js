const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Токен валидный:', decoded.name);
      return decoded; // возвращаем payload
    } catch (err) {
      console.error('Ошибка валидации токена:', err.message);
      return null; // или выбросить ошибку
    }
  };

module.exports = { signToken, verifyToken };