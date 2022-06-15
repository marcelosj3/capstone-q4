import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { AppError } from '../../../../errors';
import { UserService } from '../../../../services';
import { UUIDMock } from '../../../__mocks__';
import {
  loginSuccessfully,
  loginWithInvalidPassword,
  loginWithUnexistingEmail,
} from './__scenarios__';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

describe('Creating a user', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during test data source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should receive an invalid credentials error due to an unexisting email', async () => {
    const { payload, expected } = loginWithUnexistingEmail;

    try {
      const result = await UserService.login(payload);
      expect(result).not.toHaveProperty('token');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });

  test('Should receive an invalid credentials error due to an invalid password', async () => {
    const { payload, expected } = loginWithInvalidPassword;

    try {
      const result = await UserService.login(payload);
      expect(result).not.toHaveProperty('token');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });

  test('Should login sucessfully and return a token', async () => {
    const { payload, expected } = loginSuccessfully;

    try {
      const result = await UserService.login(payload);
      expect(result.statusCode).toEqual(expected.status);
      expect(result).toHaveProperty('token');
    } catch (error: any) {
      console.log('aaaaaaa', error);
      expect(error).not.toBeInstanceOf(AppError);
    }
  });
});
