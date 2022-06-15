import { IUserPayloadResponse } from '../interfaces/populateDatabase';
import { userListWithAddress } from './usersWithAddress';
import { userListWithoutAddress } from './usersWithoutAddress';

export const userList: IUserPayloadResponse[] = [
  ...userListWithAddress,
  ...userListWithoutAddress,
];
