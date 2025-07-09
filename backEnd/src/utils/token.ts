import jwt from 'jsonwebtoken';
import { cache } from './cache';

const ACCESS_SECRET = 'secret1234utd';

const timeToLive = 60 * 15; 

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role },
    ACCESS_SECRET,
    { expiresIn: timeToLive }
  );
};

export const validateToken = (token: string) => {
    const { userId } = jwt.verify(token, ACCESS_SECRET) as { userId: string };
    if (cache.get(userId) !== token) throw new Error('Token inválido');
    return userId;
};