import { Address, User } from '../../src/entities';
import { IUserAddressCreation } from '../../src/interfaces/users';
import { TProduct } from '../../src/types';

declare global {
  namespace Express {
    interface Request {
      decoded: Pick<User, 'userId'> & JwtPayload;
      validated: IUserAddressCreation | Address | TProduct | User;
    }
  }
}
