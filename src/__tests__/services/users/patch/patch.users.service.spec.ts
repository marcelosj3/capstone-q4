import { Request } from 'express';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { UserService } from '../../../../services';
import {
  patchUserEmail,
  patchUserEmailAndPassword,
  patchUserPassword,
} from './__scenarios__';

describe('Patch an user', () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error('Error during test data source initialization', err)
      );
  });
  afterAll(async () => await connection.destroy());
  test('Should patch an user password sucessfully', async () => {
    const { user, body, expected } = patchUserPassword;
    const result = await UserService.patch({ user, body } as Request);

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).toEqual(expected.message);
  });
  test('Should patch an user email sucessfully', async () => {
    const { user, body, expected } = patchUserEmail;
    const result = await UserService.patch({ user, body } as Request);

    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).toEqual(expected.message);
  });
  test('Should pactch an user email and password sucessfully', async () => {
    const { user, expected, body } = patchUserEmailAndPassword;
    const result = await UserService.patch({ user, body } as Request);
    expect(result.statusCode).toEqual(expected.status);
    expect(result.message).toEqual(expected.message);
  });
});
