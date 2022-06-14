import { Request } from 'express';

import { userClientWithoutAddress } from '../../utils/users';

export const createUserWithoutAddress = {
  payload: { body: userClientWithoutAddress.payload } as Request,
  expected: {
    status: 201,
    message: {
      message: userClientWithoutAddress.response,
    },
  },
};
