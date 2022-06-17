import { NextFunction, Request, Response } from 'express';

export const validateTokenWithMissingToken = {
  payload: {
    req: { headers: { authorization: '' } } as Request,
    res: {} as Response,
    next: {} as NextFunction,
  },
  expected: {
    status: 401,
    message: { error: 'Missing authorization token' },
  },
};

export const validateTokenWithMalformedJwt = {
  payload: {
    req: { headers: { authorization: 'Bearer malformed' } } as Request,
    res: {} as Response,
    next: {} as NextFunction,
  },
  expected: {
    status: 401,
    message: { error: 'jwt malformed' },
  },
};

export const validateTokenWithInvalidToken = {
  payload: {
    req: { headers: { authorization: 'Bearer invalid.auth.token' } } as Request,
    res: {} as Response,
    next: {} as NextFunction,
  },
  expected: {
    status: 401,
    message: { error: 'invalid token' },
  },
};

export const validateTokenSuccessfully = {
  payload: {
    req: { headers: { authorization: 'Bearer valid.auth.token' } } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};
