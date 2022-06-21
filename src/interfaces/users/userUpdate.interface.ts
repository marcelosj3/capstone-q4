import { User } from '../../entities';

export interface IUserUpdate extends Omit<User, 'address'> {
  oldPassword?: string;
}
