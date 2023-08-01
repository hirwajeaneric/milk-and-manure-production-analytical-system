const jwt = require('jsonwebtoken');
const { UnauthenticatedError, UnauthorizedError } = require('../errors');

const supervisorAuthorization = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid authentication');
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload.role === 'supervisor') {
      throw new UnauthorizedError('Access denied');
    } else {
      next();
    }
  } catch (error) {
    throw new UnauthorizedError('Access denied')
  }
};

module.exports = { supervisorAuthorization };