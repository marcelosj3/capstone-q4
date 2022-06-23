import { compare } from 'bcrypt';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { AppError } from '../../../../errors';
import { UserRepository } from '../../../../repositories';
import { UserService } from '../../../../services';
import { BcryptMock } from '../../../__mocks__';
import { insertOneUser } from '../../../utils/populateDatabase';
import { userClientWithoutAddress } from '../../../utils/users/usersWithoutAddress';
import {
  patchUserEmail,
  patchUserEmailAndPassword,
  patchUserPassword,
  patchUserWithIncorrectOldPassword,
  patchUserWithoutOldPassword,
} from './__scenarios__';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

describe('Patch an user', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error('Error during test data source initialization', err)
      );

    await insertOneUser(userClientWithoutAddress);
  });

  afterAll(async () => await connection.destroy());

  test('Should receive invalid credential error without an old password', async () => {
    const { payload, expected } = patchUserWithoutOldPassword;

    const update = jest.spyOn(UserRepository, 'update');

    try {
      await UserService.patch(payload);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toEqual(expected.message);
      expect(error.statusCode).toEqual(expected.status);
    }

    expect(compare).not.toBeCalled();
    expect(update).not.toBeCalled();
  });

  test('Should receive invalid credential error with invalid old password', async () => {
    const { payload, expected } = patchUserWithIncorrectOldPassword;

    BcryptMock.compare.mockResolvedValueOnce(false);
    const update = jest.spyOn(UserRepository, 'update');

    try {
      const result = await UserService.patch(payload);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(compare).toBeCalled();
    expect(update).not.toBeCalled();
  });

  test('Should patch an user email sucessfully', async () => {
    const { payload, expected } = patchUserEmail;

    BcryptMock.compare.mockResolvedValueOnce(false);
    const update = jest.spyOn(UserRepository, 'update');

    const result = await UserService.patch(payload);

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message.email).toEqual(expected.message.email);
    expect(update).toBeCalled();
  });

  test('Should patch an user email and password sucessfully', async () => {
    const { payload, expected } = patchUserEmailAndPassword;

    BcryptMock.compare.mockResolvedValueOnce(true);
    const update = jest.spyOn(UserRepository, 'update');

    try {
      const result = await UserService.patch(payload);
      expect(result.statusCode).toEqual(expected.status);
      expect(result.message).toEqual(expected.message);
    } catch (error: any) {
      expect(error.status).not.toEqual(401);
      expect(error.message).not.toEqual({ error: 'Invalid old passwords' });
    }

    expect(compare).toBeCalled();
    expect(update).toBeCalled();
  });

  test('Should patch an user password sucessfully', async () => {
    const { payload, expected } = patchUserPassword;

    BcryptMock.compare.mockResolvedValueOnce(true);
    const update = jest.spyOn(UserRepository, 'update');

    try {
      const result = await UserService.patch(payload);
      expect(result.statusCode).toEqual(expected.status);
      expect(result.message).toEqual(expected.message);
    } catch (error: any) {}

    expect(compare).toBeCalled();
    expect(update).toBeCalled();
  });
});
