import { NextFunction, Request, Response } from 'express';

import { CompanyRole } from '../../../types';
import { userManagerWithAddress } from '../../utils/users/usersWithAddress';

export const verifyRolePermissionWithouDecodedValue = {
  payload: {
    req: {
      body: {
        companyRole: CompanyRole.EMPLOYEE,
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRolePermissionWithouBodyValue = {
  payload: {
    req: {
      decoded: {
        id: userManagerWithAddress.response.userId,
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRolePermissionWithUserNotFound = {
  payload: {
    req: {
      body: {
        companyRole: CompanyRole.MANAGER,
      },
      decoded: {
        id: 'not-found-id',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 404,
    message: { error: 'User not found' },
  },
};

export const verifyRolePermissionWithManagerDecodedAndManagerInBody = {
  payload: {
    req: {
      body: {
        companyRole: CompanyRole.MANAGER,
      },
      decoded: {
        id: userManagerWithAddress.response.userId,
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};
export const verifyRolePermissionWithManagerDecodedAndEmployeeInBody = {
  payload: {
    req: {
      body: {
        companyRole: CompanyRole.EMPLOYEE,
      },
      decoded: {
        id: userManagerWithAddress.response.userId,
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};
