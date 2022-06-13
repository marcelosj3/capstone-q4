import { verify } from 'jsonwebtoken';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import './__scenarios__';

describe('Validate a token', () => {
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

  test('Should validate the received token', async () => {
    const { payload } = validateToken;

    // const result = await ValidateToken(payload)

    expect(verify).toBeCalled();
  });
});
