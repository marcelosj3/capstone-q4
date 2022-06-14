import { Request } from 'express';

import { User } from '../../../entities';
import {
  userClientWithAddress,
  userClientWithoutAddress,
} from '../../utils/users';

export const createUserWithoutAddress = {
  user: userClientWithoutAddress.response,
  payload: { validated: userClientWithoutAddress.payload } as Request,
  expected: {
    status: 201,
    message: userClientWithoutAddress.response as User,
  },
};

export const createUserWithAddress = {
  user: userClientWithAddress.response,
  address: userClientWithAddress.response.address[0],
  payload: { validated: userClientWithAddress.payload } as Request,
  expected: {
    status: 201,
    message: userClientWithAddress.response as User,
  },
};
