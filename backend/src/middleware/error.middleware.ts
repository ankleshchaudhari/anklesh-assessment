import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError.util';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle Prisma errors generically if needed
  if (err.code === 'P2002') {
    return res.status(400).json({ message: 'Duplicate field value entered' });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};
