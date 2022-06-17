import request from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import uuidMock from '../../__mocks__/uuid.mock';
import {
  createClientUserWithEmployeeToken,
  createEmployeeUserWithEmployeeToken,
  createEmployeeUserWithInvalidToken,
  createEmployeeUserWithMalformedJwt,
  createEmployeeUserWithManagerToken,
  createEmployeeUserWithoutToken,
  createManagerUserWithAdminToken,
  createManagerUserWithManagerToken,
  createUserSuccessfuly,
  createUserSuccessfulyAndNormalizeEmailValue,
  createUserSuccessfulyAndNormalizeNameValue,
  createUserWithAddressAndInvaliZipCodeFormat,
  createUserWithAddressAndMissingKeys,
  createUserWithAddressSuccessfully,
  createUserWithAlreadyExistingCPF,
  createUserWithAlreadyExistingEmail,
  createUserWithInvalidCpfFormat,
  createUserWithInvalidEmailFormat,
  createUserWithMissingKeys,
} from './__scenarios__';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

const ROUTE = '/api/users';

describe(`POST ${ROUTE}`, () => {
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

  test('Should receive a missing keys error', async () => {
    const { payload, expected } = createUserWithMissingKeys;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid email format error', async () => {
    const { payload, expected } = createUserWithInvalidEmailFormat;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid cpf format error', async () => {
    const { payload, expected } = createUserWithInvalidCpfFormat;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should create an user successfully', async () => {
    const { user, payload, expected } = createUserSuccessfuly;

    uuidMock.v4.mockReturnValueOnce(user.userId);

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an email already exists error', async () => {
    const { payload, expected } = createUserWithAlreadyExistingEmail;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive a cpf already registered error', async () => {
    const { payload, expected } = createUserWithAlreadyExistingCPF;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should create an user and normalize the name value to a capital format', async () => {
    const { payload, expected } = createUserSuccessfulyAndNormalizeNameValue;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body.name).toEqual(expected.message.name);
  });

  test('Should create an user and normalize the email value to a lowercase format', async () => {
    const { payload, expected } = createUserSuccessfulyAndNormalizeEmailValue;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body.email).toEqual(expected.message.email);
  });

  test('Should receive a missing keys error for the user and the address', async () => {
    const { payload, expected } = createUserWithAddressAndMissingKeys;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid zip code format while creating an user and address', async () => {
    const { payload, expected } = createUserWithAddressAndInvaliZipCodeFormat;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should create an user and address successfully', async () => {
    const { user, payload, expected } = createUserWithAddressSuccessfully;

    uuidMock.v4.mockReturnValueOnce(user.address![0].addressId);
    uuidMock.v4.mockReturnValueOnce(user.userId);

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive a missing authorization token error while trying to create an employee user and no token', async () => {
    const { payload, expected } = createEmployeeUserWithoutToken;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive a malformed jwt error while trying to create an user with a company role and malformed token', async () => {
    const { payload, expected } = createEmployeeUserWithMalformedJwt;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer malformed')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should receive an invalid token error while trying to create an employee user and an invalid token', async () => {
    const { payload, expected } = createEmployeeUserWithInvalidToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer invalid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should be able to create a client user by having an employee token', async () => {
    const { userToCreate, tokenUser, payload, expected } =
      createClientUserWithEmployeeToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer: valid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should not be able to create an employee user by having an employee token', async () => {
    const { userToCreate, tokenUser, payload, expected } =
      createEmployeeUserWithEmployeeToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer: valid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should be able to create an employee user by having a manager token', async () => {
    const { userToCreate, tokenUser, payload, expected } =
      createEmployeeUserWithManagerToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer: valid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should not be able to create a manager user by having a manager token', async () => {
    const { userToCreate, tokenUser, payload, expected } =
      createManagerUserWithManagerToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer: valid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });

  test('Should be able to create a manager user by having an admin token', async () => {
    const { userToCreate, tokenUser, payload, expected } =
      createManagerUserWithAdminToken;

    const response = await request(app)
      .post(ROUTE)
      .set('Authorization', 'Bearer: valid.auth.token')
      .send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });
});
