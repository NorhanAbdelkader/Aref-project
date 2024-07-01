import jwt from 'jsonwebtoken';
import userModel from '../database/models/userModel.js';

export const auth = (acessRoles = ['User']) => {
  return async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      const decodedToken = jwt.verify(token, 'privateKey');
      console.log(decodedToken)
      const user = await userModel.findById(decodedToken._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!acessRoles.includes(user.role)) {
        next(new Error('unauthrozed user', { cause: 403 }))
      } else {
        req.user = user
        next()
      }



    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};

