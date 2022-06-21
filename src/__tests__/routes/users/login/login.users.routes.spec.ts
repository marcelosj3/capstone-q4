import request from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../../../app';
import { AppDataSource } from '../../../../data-source';
import { BcryptMock, JWTMock } from '../../../__mocks__';
import { insertOneUser } from '../../../utils/populateDatabase';
import { userClientWithoutAddress } from '../../../utils/users/usersWithoutAddress';
import {
  loginUserSuccessfully,
  loginUserWithInvalidPassword,
  loginUserWithMissingEmailKey,
  loginUserWithMissingPasswordKey,
  loginUserWithUnexistingUserEmail,
} from './__scenarios__';

const ROUTE = '/api/users/login';

describe(`POST ${ROUTE}`, () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during test data source initialization', err);
      });

    await insertOneUser(userClientWithoutAddress);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should receive a missing keys error due to not have an email', async () => {
    const { payload, expected } = loginUserWithMissingEmailKey;

    const response = await request(app).post(ROUTE).send(payload);

    expect(BcryptMock.compare).not.toBeCalled();
    expect(JWTMock.sign).not.toBeCalled();
    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive a missing keys error due to not have a password', async () => {
    const { payload, expected } = loginUserWithMissingPasswordKey;

    const response = await request(app).post(ROUTE).send(payload);

    expect(BcryptMock.compare).not.toBeCalled();
    expect(JWTMock.sign).not.toBeCalled();
    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid credentials error due to try to login with an unexisting email', async () => {
    const { payload, expected } = loginUserWithUnexistingUserEmail;

    const response = await request(app).post(ROUTE).send(payload);

    expect(BcryptMock.compare).not.toBeCalled();
    expect(JWTMock.sign).not.toBeCalled();
    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid credentials error due to try to login with an invalid password', async () => {
    const { payload, expected } = loginUserWithInvalidPassword;

    BcryptMock.compare.mockResolvedValueOnce(false);

    const response = await request(app).post(ROUTE).send(payload);

    expect(BcryptMock.compare).toBeCalled();
    expect(JWTMock.sign).not.toBeCalled();
    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should login sucessfully', async () => {
    const { payload, expected } = loginUserSuccessfully;

    BcryptMock.compare.mockReturnValue(true);
    JWTMock.sign.mockReturnValueOnce('valid.user.token');

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.body).toEqual(expected.message);
    expect(response.status).toEqual(expected.status);
    expect(BcryptMock.compare).toBeCalled();
    expect(JWTMock.sign).toHaveBeenCalled();
  });
});
