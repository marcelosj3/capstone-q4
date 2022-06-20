import { User } from '../../src/entities';
import { IUserAddressCreation } from '../../src/interfaces/users';

declare global {
  namespace Express {
    interface Request {
      decoded: Pick<User, 'userId'> & JwtPayload;
      user: User;
      validated: IUserAddressCreation;
    }
  }
}
