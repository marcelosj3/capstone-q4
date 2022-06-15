import { userListWithAddress } from '../users';
import { insertOneUserWithAddress } from './insertOneUserWithAddress';

export const populateDatabaseWithUsersAndAddresses = async () => {
  await Promise.all(
    userListWithAddress.map(
      async (user) => await insertOneUserWithAddress(user)
    )
  );
};
