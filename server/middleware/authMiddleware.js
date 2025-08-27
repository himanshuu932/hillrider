// authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
  const token = req.cookies.adminToken;
  console.log("Token from cookies:", token);
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};