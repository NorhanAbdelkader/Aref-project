const jwt = require('jsonwebtoken');
const User = require('../database/models/userModel');

module.exports  = async (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, 'privateKey');
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

 