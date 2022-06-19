import { IUserPayloadResponse } from '../interfaces/populateDatabase';
import { userListWithAddress } from '../users';
import { insertOneUser } from './insertOneUser';

export const populateDatabaseWithUsersAndAddresses = async () => {
  for (let i = 0; i < userListWithAddress.length; i++) {
    const user: IUserPayloadResponse = userListWithAddress[i];

    await insertOneUser(user);
  }
};
