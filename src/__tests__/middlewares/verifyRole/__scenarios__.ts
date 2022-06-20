import { NextFunction, Request, Response } from 'express';

import { CompanyRole } from '../../../types';
import {
  userAdminWithAddress,
  userEmployeeWithAddress,
  userManagerWithAddress,
} from '../../utils/users/usersWithAddress';
import {
  userClientWithoutAddress,
  userManagerWithoutAddress,
} from '../../utils/users/usersWithoutAddress';

export const verifyRoleWithoutDecodedKey = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {} as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 400,
    message: { error: 'A valid token is required to proceed' },
  },
};

export const verifyRoleWithDecodedKeyAndNoValidateTokenParameter = {
  authorizedRole: CompanyRole.EMPLOYEE,
  payload: {
    req: {
      decoded: { id: userManagerWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleWithDecodedKeyAndNoValidateTokenParameterToFail = {
  authorizedRole: CompanyRole.MANAGER,
  payload: {
    req: {
      decoded: { id: userEmployeeWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleWithoutDecodedKeyAndNoValidateTokenParameter = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {} as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleAdminAsUserClient = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {
      decoded: { id: userClientWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleManagerAsUserClient = {
  authorizedRole: CompanyRole.MANAGER,
  payload: {
    req: {
      decoded: { id: userClientWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleEmployeeAsUserClient = {
  authorizedRole: CompanyRole.EMPLOYEE,
  payload: {
    req: {
      decoded: { id: userClientWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleClientAsUserClient = {
  authorizedRole: CompanyRole.CLIENT,
  payload: {
    req: {
      decoded: { id: userClientWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleAdminAsUserEmployee = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {
      decoded: { id: userEmployeeWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleManagerAsUserEmployee = {
  authorizedRole: CompanyRole.MANAGER,
  payload: {
    req: {
      decoded: { id: userEmployeeWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleEmployeeAsUserEmployee = {
  authorizedRole: CompanyRole.EMPLOYEE,
  payload: {
    req: {
      decoded: { id: userEmployeeWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleClientAsUserEmployee = {
  authorizedRole: CompanyRole.CLIENT,
  payload: {
    req: {
      decoded: { id: userEmployeeWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleAdminAsUserManager = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {
      decoded: { id: userManagerWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    statusCode: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const verifyRoleManagerAsUserManager = {
  authorizedRole: CompanyRole.MANAGER,
  payload: {
    req: {
      decoded: { id: userManagerWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleEmployeeAsUserManager = {
  authorizedRole: CompanyRole.EMPLOYEE,
  payload: {
    req: {
      decoded: { id: userManagerWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleClientAsUserManager = {
  authorizedRole: CompanyRole.CLIENT,
  payload: {
    req: {
      decoded: { id: userManagerWithoutAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleAdminAsUserAdmin = {
  authorizedRole: CompanyRole.ADMIN,
  payload: {
    req: {
      decoded: { id: userAdminWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleManagerAsUserAdmin = {
  authorizedRole: CompanyRole.MANAGER,
  payload: {
    req: {
      decoded: { id: userAdminWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleEmployeeAsUserAdmin = {
  authorizedRole: CompanyRole.EMPLOYEE,
  payload: {
    req: {
      decoded: { id: userAdminWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};

export const verifyRoleClientAsUserAdmin = {
  authorizedRole: CompanyRole.CLIENT,
  payload: {
    req: {
      decoded: { id: userAdminWithAddress.response.userId },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
};
