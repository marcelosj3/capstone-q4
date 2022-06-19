import { NextFunction, Request, Response } from 'express';

import { createUserSchema } from '../../../schemas';
import { cpfMatches, emailFormat } from '../../../utils';
import { userClientWithAddress } from '../../utils/users/usersWithAddress';
import { userClientWithoutAddress } from '../../utils/users/usersWithoutAddress';

export const validateSchemaWithEmptyBody = {
  schemaShape: createUserSchema,
  payload: {
    req: {} as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: [
        'name is a required field',
        'email is a required field',
        'cpf is a required field',
        'password is a required field',
      ],
    },
  },
};

export const validateSchemaWithSomeKeys = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithoutAddress.payload,
        cpf: undefined,
        password: undefined,
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: [
        'cpf is a required field',
        'password is a required field',
      ],
    },
  },
};

export const validateSchemaWithInvalidEmailFormat = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithoutAddress.payload,
        email: 'invalidmail.format.com',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: emailFormat.message,
  },
};

export const validateSchemaWithInvalidCPFFormat = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithoutAddress.payload,
        cpf: '0000',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: cpfMatches.message,
  },
};

export const validateSchemaWithInvalidCPFAndEmailFormat = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithoutAddress.payload,
        email: 'invalidmail.format.com',
        cpf: '0000',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: [emailFormat.message, cpfMatches.message],
  },
};

export const validateSchemaWithInvalidCPFFormatAndMissingKeys = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithoutAddress.payload,
        name: undefined,
        email: undefined,
        cpf: '0000',
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: [
      cpfMatches.message,
      {
        error: 'Missing keys',
        requiredFields: [
          'name is a required field',
          'email is a required field',
        ],
      },
    ],
  },
};

export const validateSchemaWithAddressAndMissingKeys = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithAddress.payload,
        address: {
          ...userClientWithAddress.payload.address,
          state: undefined,
          city: undefined,
        },
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: [
        'address.state is a required field',
        'address.city is a required field',
      ],
    },
  },
};

export const validateSchemaWithAddressAndInvalidZipCode = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: {
        ...userClientWithAddress.payload,
        address: {
          ...userClientWithAddress.payload.address,
          zipCode: '0000',
        },
      },
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: {
      error: 'Invalid zip code format',
      expected: 'XXXXX-XXX',
    },
  },
};

export const validateSchemaWithSuccessfully = {
  schemaShape: createUserSchema,
  payload: {
    req: {
      body: userClientWithoutAddress.payload,
    } as Request,
    res: {} as Response,
    next: jest.fn() as NextFunction,
  },
  expected: {
    status: 400,
    message: [
      cpfMatches.message,
      {
        error: 'Missing keys',
        requiredFields: [
          'name is a required field',
          'email is a required field',
        ],
      },
    ],
  },
};
