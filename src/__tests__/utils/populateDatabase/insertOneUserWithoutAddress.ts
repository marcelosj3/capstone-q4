import { User } from '../../../entities';
import { UserRepository } from '../../../repositories';
import { UUIDMock } from '../../__mocks__';
import { IUserPayloadResponse } from '../interfaces/populateDatabase';

export const insertOneUserWithoutAddress = async (
  user: IUserPayloadResponse
) => {
  const { payload, response } = user;

  const userCreate = UserRepository.create(payload as User);

  UUIDMock.v4.mockReturnValueOnce(response.userId);

  return await UserRepository.save(userCreate as User);
};
