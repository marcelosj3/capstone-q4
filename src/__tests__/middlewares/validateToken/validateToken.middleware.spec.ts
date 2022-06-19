import { verify } from 'jsonwebtoken';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { validateTokenMiddleware } from '../../../middlewares';
import { JWTMock } from '../../__mocks__';
import {
  validateTokenSuccessfully,
  validateTokenWithInvalidToken,
  validateTokenWithMalformedJwt,
  validateTokenWithMissingToken,
} from './__scenarios__';

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn(jest.requireActual('jsonwebtoken').verify),
}));

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

  test('Should receive a missing token error', async () => {
    const {
      payload: { req, res, next },
      expected,
    } = validateTokenWithMissingToken;

    try {
      await validateTokenMiddleware(req, res, next);
      expect(verify).not.toBeCalled();
    } catch (error: any) {
      expect(verify).not.toBeCalled();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });

  test('Should receive a malformed jwt error', async () => {
    const {
      payload: { req, res, next },
      expected,
    } = validateTokenWithMalformedJwt;

    JWTMock.verify.mockImplementationOnce(() => {
      throw new AppError({ error: 'jwt malformed' }, 401);
    });

    try {
      await validateTokenMiddleware(req, res, next);
      expect(verify).not.toBeCalled();
    } catch (error: any) {
      expect(verify).toBeCalled();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }
  });

  test('Should receive an invalid token error', async () => {
    const {
      payload: { req, res, next },
      expected,
    } = validateTokenWithInvalidToken;

    JWTMock.verify.mockImplementationOnce(() => {
      throw new AppError({ error: 'invalid token' }, 401);
    });

    try {
      await validateTokenMiddleware(req, res, next);
      expect(verify).not.toBeCalled();
    } catch (error: any) {
      expect(verify).toBeCalled();
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toEqual(expected.message);
      expect(error.statusCode).toEqual(expected.status);
    }
  });

  test('Should validate the received token', async () => {
    const {
      payload: { req, res, next },
    } = validateTokenSuccessfully;

    JWTMock.verify.mockImplementationOnce(() => next());

    try {
      await validateTokenMiddleware(req, res, next);
      expect(verify).toBeCalled();
      expect(next).toHaveBeenCalled();
    } catch (error: any) {
      expect(verify).toBeCalled();
      expect(next).toHaveBeenCalled();
      expect(error).not.toBeInstanceOf(AppError);
      expect(error.statusCode).not.toEqual(401);
    }
  });
});
