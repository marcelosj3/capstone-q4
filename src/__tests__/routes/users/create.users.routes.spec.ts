import request from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { createUserWithoutToken } from './__scenarios__';

const ROUTE = '/users';

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

  test('Should receive a missing authorization token error', async () => {
    const { payload, expected } = createUserWithoutToken;

    const response = await request(app).post(ROUTE).send(payload);

    expect(response.status).toEqual(expected.status);
    expect(response.body).toEqual(expected.message);
  });
});
