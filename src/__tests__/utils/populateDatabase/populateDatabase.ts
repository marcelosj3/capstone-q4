import { populateDatabaseWithUsers } from './populateDatabaseWithUsers';
import { populateDatabaseWithUsersAndAddresses } from './populateDatabaseWithUsersAndAddresses';

export const populateDatabase = async () => {
  await populateDatabaseWithUsers();
  await populateDatabaseWithUsersAndAddresses();
};
