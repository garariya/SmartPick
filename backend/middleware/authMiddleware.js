import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async(req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded;

    console.log("decoded token",decoded);


    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
