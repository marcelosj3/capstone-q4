import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { verifyForKeyInBodyAndValidateToken } from '../../../middlewares/users/verifyForKeyInBodyAndValidateToken.middleware';
import { JWTMock } from '../../__mocks__';
import {
  verifyForKeyInEmptyBodyAndProceedToNextFunction,
  verifyForKeyInPopulatedBodyAndCheckInvalidToken,
  verifyForKeyInPopulatedBodyAndCheckMalformedToken,
  verifyForKeyInPopulatedBodyAndCheckMissingToken,
  verifyForKeyInPopulatedBodyAndValidateToken,
} from './__scenarios__';

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn(jest.requireActual('jsonwebtoken').verify),
}));

describe('Verify for certain keys in the body request and validate a token if they are present', () => {
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

  test('Should not find a key in an empty body and proceed to the next function', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
    } = verifyForKeyInEmptyBodyAndProceedToNextFunction;

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error) {}

    expect(next).toBeCalled();
  });

  test('Should not find a key in a populated body and proceed to the next function', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
    } = verifyForKeyInEmptyBodyAndProceedToNextFunction;

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error) {}

    expect(JWTMock.verify).not.toBeCalled();
    expect(JWTMock.decode).not.toBeCalled();
    expect(next).toBeCalled();
  });

  test('Should receive a missign authorization token error', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
      expected,
    } = verifyForKeyInPopulatedBodyAndCheckMissingToken;

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(AppError).toThrow();
    expect(JWTMock.verify).not.toBeCalled();
    expect(JWTMock.decode).not.toBeCalled();
    expect(next).not.toBeCalled();
  });

  test('Should receive a malformed token error', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
      expected,
    } = verifyForKeyInPopulatedBodyAndCheckMalformedToken;

    JWTMock.verify.mockImplementationOnce(() => {
      throw new AppError({ error: 'jwt malformed' }, 401);
    });

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(AppError).toThrow();
    expect(JWTMock.verify).toBeCalled();
    expect(JWTMock.decode).not.toBeCalled();
    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid token error', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
      expected,
    } = verifyForKeyInPopulatedBodyAndCheckInvalidToken;

    JWTMock.verify.mockImplementationOnce(() => {
      throw new AppError({ error: 'invalid token' }, 401);
    });

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.statusCode);
      expect(error.message).toEqual(expected.message);
    }

    expect(AppError).toThrow();
    expect(JWTMock.verify).toBeCalled();
    expect(JWTMock.decode).not.toBeCalled();
    expect(next).not.toBeCalled();
  });

  test('Should receive decode the token and proceed to the next function', async () => {
    const {
      keysToVerify,
      payload: { req, res, next },
    } = verifyForKeyInPopulatedBodyAndValidateToken;

    JWTMock.verify.mockImplementationOnce(() => {});
    JWTMock.decode.mockReturnValueOnce({ id: 'valid-id' });

    try {
      await verifyForKeyInBodyAndValidateToken(keysToVerify)(req, res, next);
    } catch (error: any) {}

    expect(JWTMock.verify).toBeCalled();
    expect(JWTMock.decode).toBeCalled();
    expect(next).toBeCalled();
  });
});
