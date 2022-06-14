import { Address, User } from '../../entities';

export interface IUserAddressCreation extends Omit<User, 'address'> {
  address?: Address;
}
