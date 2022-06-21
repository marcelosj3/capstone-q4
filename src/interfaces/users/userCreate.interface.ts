import { Address, User } from '../../entities';

export interface IUserCreate extends Omit<User, 'address'> {
  address?: Address;
}
