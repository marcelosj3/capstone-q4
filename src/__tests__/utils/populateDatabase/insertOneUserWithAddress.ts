import { Address, User } from '../../../entities';
import { AddressRepository, UserRepository } from '../../../repositories';
import { JWTMock, UUIDMock } from '../../__mocks__';
import { IUserPayloadResponse } from '../interfaces/populateDatabase';

export const insertOneUserWithAddress = async (user: IUserPayloadResponse) => {
  const copyUser = JSON.parse(JSON.stringify(user));

  const { payload, response } = copyUser;

  const { address } = payload;

  UUIDMock.v4.mockReturnValueOnce(response.address[0].addressId);
  UUIDMock.v4.mockReturnValueOnce(response.userId);

  delete payload.address;

  const userCreate = UserRepository.create(payload as User);
  const addressSave = await AddressRepository.save(address as Address);

  userCreate.address = [addressSave];

  return await UserRepository.save(userCreate as User);
};
