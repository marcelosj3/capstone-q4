import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { verifyRolePermissionMiddleware } from '../../../middlewares/users/verifyRolePermission.middleware';
import { insertOneUser } from '../../utils/populateDatabase';
import { userManagerWithAddress } from '../../utils/users/usersWithAddress';
import {
  verifyRolePermissionWithManagerDecodedAndEmployeeInBody,
  verifyRolePermissionWithManagerDecodedAndManagerInBody,
  verifyRolePermissionWithouBodyValue,
  verifyRolePermissionWithouDecodedValue,
  verifyRolePermissionWithUserNotFound,
} from './__scenarios__';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

describe('Verify an user role against a minimum required permission level', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during test data source initialization', err);
      });

    await insertOneUser(userManagerWithAddress);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should not look for the permission level and proceed to the next function since there is no decoded value', async () => {
    const {
      payload: { req, res, next },
    } = verifyRolePermissionWithouDecodedValue;

    try {
      await verifyRolePermissionMiddleware(req, res, next);
    } catch (error: any) {}

    expect(next).toBeCalled();
  });

  test('Should not look for the permission level and proceed to the next function since there is no body value', async () => {
    const {
      payload: { req, res, next },
    } = verifyRolePermissionWithouBodyValue;

    try {
      await verifyRolePermissionMiddleware(req, res, next);
    } catch (error: any) {}

    expect(next).toBeCalled();
  });

  test('Should look for the permission level and throw an user not found error', async () => {
    const {
      payload: { req, res, next },
      expected,
    } = verifyRolePermissionWithUserNotFound;

    try {
      await verifyRolePermissionMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should look for the permission level and throw an permission error', async () => {
    const {
      payload: { req, res, next },
      expected,
    } = verifyRolePermissionWithManagerDecodedAndManagerInBody;

    try {
      await verifyRolePermissionMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should look for the permission level and proceed to the next function', async () => {
    const {
      payload: { req, res, next },
    } = verifyRolePermissionWithManagerDecodedAndEmployeeInBody;

    try {
      await verifyRolePermissionMiddleware(req, res, next);
    } catch (error: any) {}

    expect(next).toBeCalled();
  });
});
