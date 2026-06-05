import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      status: 'error',
      message: 'Error de validación',
      issues: error.issues,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2003') {
      return response.status(400).json({
        status: 'error',
        message: 'Clave foránea no existe, por favor verifique que el tipo de teléfono exista.',
      });
    }
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
  });
};
