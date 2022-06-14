import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { UserService } from '../../../services';
import { UUIDMock } from '../../__mocks__';
import {
  createUserWithAddress,
  createUserWithoutAddress,
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

  test('Should create an user without address successfully', async () => {
    const { user, payload, expected } = createUserWithoutAddress;

    UUIDMock.v4.mockReturnValueOnce(user.userId);

    const result = await UserService.create(payload);

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).not.toHaveProperty('address');
    expect(result.message.userId).toEqual(expected.message.userId);
    expect(result.message.name).toEqual(expected.message.name);
    expect(result.message.email).toEqual(expected.message.email);
  });

  test('Should create an user with address successfully', async () => {
    const { user, address, payload, expected } = createUserWithAddress;

    UUIDMock.v4.mockReturnValueOnce(user.userId);
    UUIDMock.v4.mockReturnValueOnce(address.addressId);

    const result = await UserService.create(payload);

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).toHaveProperty('address');
    expect(result.message.userId).toEqual(expected.message.userId);
    expect(result.message.name).toEqual(expected.message.name);
    expect(result.message.email).toEqual(expected.message.email);
    expect(result.message.address).toEqual(expected.message.address);
  });
});
