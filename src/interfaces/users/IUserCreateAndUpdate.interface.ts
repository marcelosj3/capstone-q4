import { Address, User } from '../../entities';

export interface IUserCreateAndUpdate extends Omit<User, 'address'> {
  address?: Address;
  oldPassword?: string;
}
