import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { AppError } from '../../../../errors';
import { UserService } from '../../../../services';
import { BcryptMock, JWTMock } from '../../../__mocks__';
import { populateDatabase } from '../../../utils/populateDatabase';
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

describe('Login with an user', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during test data source initialization', err);
      });

    await populateDatabase();
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

    BcryptMock.compare.mockResolvedValueOnce(true);
    JWTMock.sign.mockReturnValueOnce(expected.message.token);

    try {
      const result = await UserService.login(payload);

      expect(result.statusCode).toEqual(expected.status);
      expect(result.message).toHaveProperty('token');
      expect(result.message).toEqual(expected.message);
    } catch (error: any) {
      expect(error.status).not.toEqual(401);
      expect(error.message).not.toEqual({ error: 'invalid credentials' });
    }
  });
});
