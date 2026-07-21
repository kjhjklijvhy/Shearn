import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { ZodError } from 'zod';

interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.isOperational = err.isOperational ?? true;

  // Zod Validation Error
  if (err instanceof ZodError) {
    logger.warn('Validation error', { errors: err.errors });
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Operational Error
  if (err.isOperational) {
    logger.warn('Operational error', {
      statusCode: err.statusCode,
      message: err.message
    });
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Programming Error
  logger.error('Unhandled error', {
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  });

  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

export const createError = (
  statusCode: number,
  message: string
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
