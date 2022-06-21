import { User } from '../../src/entities';
import { Validated } from '../../src/types';

declare global {
  namespace Express {
    interface Request {
      decoded: Pick<User, 'userId'> & JwtPayload;
      user: User;
      validated: Validated;
    }
  }
}
