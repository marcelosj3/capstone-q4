import { userListWithoutAddress } from '../users';
import { insertOneUser } from './insertOneUser';

export const populateDatabaseWithUsers = async () => {
  await Promise.all(
    userListWithoutAddress.map(async (user) => await insertOneUser(user))
  );
};
