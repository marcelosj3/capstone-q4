import { User } from '../../../entities';
import { UserRepository } from '../../../repositories';
import { UUIDMock } from '../../__mocks__';

// @ts-ignore
export const insertOneUser = async (user) => {
  const { payload, response } = user;

  const userCreate = UserRepository.create(payload as User);

  UUIDMock.v4.mockReturnValueOnce(response.userId);

  return await UserRepository.save(userCreate as User);
};
