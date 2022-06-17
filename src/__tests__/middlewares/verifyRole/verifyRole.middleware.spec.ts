import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { verifyRoleMiddleware } from '../../../middlewares';
import { populateDatabase } from '../../utils/populateDatabase';
import {
  verifyRoleAdminAsUserAdmin,
  verifyRoleAdminAsUserClient,
  verifyRoleAdminAsUserEmployee,
  verifyRoleAdminAsUserManager,
  verifyRoleClientAsUserAdmin,
  verifyRoleClientAsUserClient,
  verifyRoleClientAsUserEmployee,
  verifyRoleClientAsUserManager,
  verifyRoleEmployeeAsUserAdmin,
  verifyRoleEmployeeAsUserClient,
  verifyRoleEmployeeAsUserEmployee,
  verifyRoleEmployeeAsUserManager,
  verifyRoleManagerAsUserAdmin,
  verifyRoleManagerAsUserClient,
  verifyRoleManagerAsUserEmployee,
  verifyRoleManagerAsUserManager,
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

    await populateDatabase();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should not give permission to a client user to access a minimum admin permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleAdminAsUserClient;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should not give permission to a client user to access a minimum manager permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleManagerAsUserClient;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should not give permission to a client user to access a minimum employee permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleEmployeeAsUserClient;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should give permission to a client user to access a minimum client permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleClientAsUserClient;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should not give permission to an employee user to access a minimum admin permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleAdminAsUserEmployee;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should not give permission to an employee user to access a minimum manager permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleManagerAsUserEmployee;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should give permission to an employee user to access a minimum employee permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleEmployeeAsUserEmployee;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to an employee user to access a minimum client permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleClientAsUserEmployee;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should not give permission to a manager user to access a minimum admin permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
      expected,
    } = verifyRoleAdminAsUserManager;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should give permission to a manager user to access a minimum manager permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleManagerAsUserManager;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to a manager user to access a minimum employee permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleEmployeeAsUserManager;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to a manager user to access a minimum client permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleClientAsUserManager;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to an admin user to access a minimum admin permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleAdminAsUserAdmin;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to an admin user to access a minimum manager permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleManagerAsUserAdmin;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to an admin user to access a minimum employee permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleEmployeeAsUserAdmin;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should give permission to an admin user to access a minimum client permission route', async () => {
    const {
      authorizedRole,
      payload: { req, res, next },
    } = verifyRoleClientAsUserAdmin;

    try {
      await verifyRoleMiddleware(authorizedRole)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });
});
