const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // 1. Get the token from the header
  const token = req.header('x-auth-token');

  // 2. Check of no token
  if (!token) {
    res.status(401).json({
      msg: 'No token found. Authorization denied!',
    });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};
