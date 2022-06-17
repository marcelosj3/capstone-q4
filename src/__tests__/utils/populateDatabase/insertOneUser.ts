import { IUserPayloadResponse } from '../interfaces/populateDatabase';
import { insertOneUserWithAddress } from './insertOneUserWithAddress';
import { insertOneUserWithoutAddress } from './insertOneUserWithoutAddress';

/**
 * Insert one user from the userList,
 * the user must contain both the payload
 * and response keys in the object to be able
 * to insert.
 *
 * @param {[IUserPayloadResponse]} user object containing
 * payload and response keys.
 */
export const insertOneUser = async (user: IUserPayloadResponse) => {
  const hasAddress = !!user.payload.address;

  if (hasAddress) return insertOneUserWithAddress(user);

  return insertOneUserWithoutAddress(user);
};
