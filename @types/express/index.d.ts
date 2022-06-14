import { IUserAddressCreation } from '../../src/interfaces/users';

declare global {
  namespace Express {
    interface Request {
      validated: IUserAddressCreation;
    }
  }
}
