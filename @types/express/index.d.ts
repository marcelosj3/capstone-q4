
import { Address, User } from '../../src/entities';
import { TProduct } from '../../src/types';
import { IUserAddressCreation } from '../../src/interfaces/users';

declare global {
  namespace Express {
    interface Request {
      decoded: Pick<User, 'userId'> & JwtPayload;
      validated: IUserAddressCreation | Address | TProduct | User;
    }
  }
}
