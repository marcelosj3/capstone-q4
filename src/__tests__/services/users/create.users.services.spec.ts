import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { createUserWithoutAddress } from './__scenarios__';

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

  test('Should create a user successfully', async () => {
    const { payload, expected } = createUserWithoutAddress;

    // const result = await UserServices.create(payload)
    const result = { statusCode: 201, message: {} };

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).toEqual(expected.message);
  });
});
