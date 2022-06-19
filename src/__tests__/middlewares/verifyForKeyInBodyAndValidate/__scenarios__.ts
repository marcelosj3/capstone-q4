import { NextFunction, Request, Response } from 'express';

import {
  userClientWithAddress,
  userEmployeeWithAddress,
} from '../../utils/users/usersWithAddress';

export const verifyForKeyInEmptyBodyAndProceedToNextFunction = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: {},
      headers: { authorization: '' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 401,
    message: { error: 'Missing authorization token' },
  },
};

export const verifyForKeyInPopulatedBodyAndProceedToNextFunction = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: userClientWithAddress.payload,
      headers: { authorization: '' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyForKeyInPopulatedBodyAndCheckMissingToken = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: userEmployeeWithAddress.payload,
      headers: { authorization: '' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'Missing authorization token' },
  },
};

export const verifyForKeyInPopulatedBodyAndCheckMalformedToken = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: userEmployeeWithAddress.payload,
      headers: { authorization: 'Bearer malformed' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'jwt malformed' },
  },
};

export const verifyForKeyInPopulatedBodyAndCheckInvalidToken = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: userEmployeeWithAddress.payload,
      headers: { authorization: 'Bearer invalid.auth.token' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'invalid token' },
  },
};

export const verifyForKeyInPopulatedBodyAndValidateToken = {
  keysToVerify: ['companyRole'],
  payload: {
    req: {
      body: userEmployeeWithAddress.payload,
      headers: { authorization: 'Bearer invalid.auth.token' },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};
