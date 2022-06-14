import * as yup from 'yup';

import { User } from '../../src/entities';
import { IUserAddressCreation } from '../../src/interfaces/users';

declare global {
  namespace Express {
    interface Request {
      validated: IUserAddressCreation;
    }
  }
}
