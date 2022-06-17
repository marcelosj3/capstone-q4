import { IUserPayloadResponse } from '../interfaces/populateDatabase';
import { userListWithoutAddress } from '../users';
import { insertOneUser } from './insertOneUser';

export const populateDatabaseWithUsers = async () => {
  for (let i = 0; i < userListWithoutAddress.length; i++) {
    const user: IUserPayloadResponse = userListWithoutAddress[i];

    await insertOneUser(user);
  }
};
