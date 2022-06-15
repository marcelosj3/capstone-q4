import { Request } from 'express';

import { userClientWithAddress } from '../../../utils/users/usersWithAddress';

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
  payload: { validated: userClientWithAddress.payload } as Request,
  expected: {
    status: 200,
    message: { token: 'valid-user-token' },
  },
};
