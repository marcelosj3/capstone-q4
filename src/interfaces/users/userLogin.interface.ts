import { User } from '../../entities';

export interface IUserLogin extends Pick<User, 'email' | 'password'> {}
