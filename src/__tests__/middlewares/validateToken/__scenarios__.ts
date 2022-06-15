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
    req: { headers: { authorization: 'Bearer invalid' } } as Request,
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
    req: {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiZjRjZTFlLWM4YzQtNDU3NC1hNmU4LTI0ZGFhZjlmOTkyZCIsImlhdCI6MTY1NTMyNjIwNiwiZXhwIjoxNjU1NDEyNjA2fQ.GTrwScTY9FN1H1wR_-MtikM7cBo61jAoK9zNlm2zhOE',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};
