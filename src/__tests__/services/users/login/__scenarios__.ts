import { Request } from 'express';

import { User } from '../../../../entities';
import {
  userClientWithAddress,
  userClientWithoutAddress,
} from '../../../utils/users';

export const loginWithUnexistingEmail = {
  payload: {
    validated: { email: 'thisemaildoesnotexist@mail.com' },
  } as Request,
  expected: {
    status: 401,
    message: { error: 'invalid credentials' },
  },
};

export const loginWithInvalidPassword = {
  user: userClientWithAddress.response,
  payload: {
    validated: {
      ...userClientWithAddress.payload,
      password: 'wrong-password',
    },
  } as Request,
  expected: {
    status: 401,
    message: { error: 'invalid credentials' },
  },
};

export const loginSuccessfully = {
  user: userClientWithAddress.response,
  payload: { validated: userClientWithAddress.payload } as Request,
  expected: {
    status: 200,
    message: { token: 'valid-token' },
  },
};
