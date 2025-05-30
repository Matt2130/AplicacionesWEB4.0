import jwt from 'jsonwebtoken';
import { cache } from './cache';

const ACCESS_SECRET = 'secret1234utd';

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: '15min'
        }
    )
}

export const validateToken = (token: string) => {
    const { userId } = jwt.verify(token, ACCESS_SECRET) as { userId: string };
    if (cache.get(userId) !== token) throw new Error('Token inválido');
    return userId;
};