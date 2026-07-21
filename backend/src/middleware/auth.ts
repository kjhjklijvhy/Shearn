import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { createError } from './errorHandler.js';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    req.userId = decoded.id;
    next();
  } catch (error) {
    throw createError(401, 'Invalid or expired token');
  }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      throw createError(403, 'Admin access required');
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    throw createError(401, 'Invalid or expired token');
  }
};
