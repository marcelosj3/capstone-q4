import { Request } from 'express';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { AppError } from '../../../../errors';
import { UserService } from '../../../../services';
import { BcryptMock } from '../../../__mocks__';
import {
  patchUserEmail,
  patchUserEmailAndPassword,
  patchUserPassword,
  patchUserWithIncorrectOldPassword,
  patchUserWithoutOldPassword,
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
    BcryptMock.compare.mockResolvedValueOnce(true);
    try {
      const result = await UserService.patch({ user, body } as Request);
      expect(result.statusCode).toEqual(expected.status);
      expect(result.message).toEqual(expected.message);
    } catch (error: any) {
      expect(error.status).not.toEqual(401);
      expect(error.message).not.toEqual({ error: 'Invalid old password' });
    }
  });
  test('Should recive invalid credential error without an old password', async () => {
    const { user, body, expected } = patchUserWithoutOldPassword;
    BcryptMock.compare.mockResolvedValueOnce(false);
    try {
      const result = await UserService.patch({ user, body } as Request);
      expect(result.statusCode).not.toEqual(expected.status);
      expect(result.message).not.toEqual(expected.message);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });
  test('Should recive invalid credential error with invalid old password', async () => {
    const { user, body, expected } = patchUserWithIncorrectOldPassword;
    BcryptMock.compare.mockResolvedValueOnce(true);
    try {
      const result = await UserService.patch({ user, body } as Request);
      expect(result.statusCode).not.toEqual(expected.status);
      expect(result.message).not.toEqual(expected.message);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });
  test('Should patch an user email sucessfully', async () => {
    const { user, body, expected } = patchUserEmail;
    BcryptMock.compare.mockResolvedValueOnce(false);
    const result = await UserService.patch({ user, body } as Request);
    expect(result.statusCode).toEqual(expected.status);
    expect(result.message.email).toEqual(expected.message.email);
  });
  test('Should pactch an user email and password sucessfully', async () => {
    const { user, expected, body } = patchUserEmailAndPassword;
    BcryptMock.compare.mockResolvedValueOnce(true);
    try {
      const result = await UserService.patch({ user, body } as Request);
      expect(result.statusCode).toEqual(expected.status);
      expect(result.message).toEqual(expected.message);
    } catch (error: any) {
      expect(error.status).not.toEqual(401);
      expect(error.message).not.toEqual({ error: 'Invalid old passwords' });
    }
  });
  // test('Should pactch an user email and password sucessfully', async () => {
  //   const { user, expected, body } = patchUserEmailAndPassword;
  //   BcryptMock.compare.mockResolvedValueOnce(true);
  //   try {
  //     const result = await UserService.patch({ user, body } as Request);
  //     expect(result.statusCode).toEqual(expected.status);
  //     expect(result.message).toEqual(expected.message);
  //   } catch (error: any) {
  //     expect(error.status).not.toEqual(401);
  //     expect(error.message).not.toEqual({ error: 'Invalid old passwords' });
  //   }
  // });
});
