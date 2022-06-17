import { IUserPayloadResponse } from '../interfaces/populateDatabase';
import { userListWithAddress } from '../users';
import { insertOneUserWithAddress } from './insertOneUserWithAddress';

export const populateDatabaseWithUsersAndAddresses = async () => {
  for (let i = 0; i < userListWithAddress.length; i++) {
    const user: IUserPayloadResponse = userListWithAddress[i];

    await insertOneUserWithAddress(user);
  }
};
