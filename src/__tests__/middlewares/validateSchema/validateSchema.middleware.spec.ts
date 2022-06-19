import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { validateSchemaMiddleware } from '../../../middlewares';
import { YupMock } from '../../__mocks__';
import { YupError } from '../../utils';
import {
  validateSchemaWithAddressAndInvalidZipCode,
  validateSchemaWithAddressAndMissingKeys,
  validateSchemaWithEmptyBody,
  validateSchemaWithInvalidCPFAndEmailFormat,
  validateSchemaWithInvalidCPFFormat,
  validateSchemaWithInvalidCPFFormatAndMissingKeys,
  validateSchemaWithInvalidEmailFormat,
  validateSchemaWithSomeKeys,
  validateSchemaWithSuccessfully,
} from './__scenarios__';

describe('Validate a schema', () => {
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

  test('Should receive a missing keys error since the body is empty', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithEmptyBody;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        'name is a required field',
        'email is a required field',
        'cpf is a required field',
        'password is a required field',
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(schemaShape.validate).toBeCalled();
    expect(next).not.toBeCalled();
  });

  test('Should receive a missing keys error with some of the values being sent in the body', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithSomeKeys;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        'cpf is a required field',
        'password is a required field',
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid email format error', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithInvalidEmailFormat;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        { error: 'Invalid email format', expected: 'mail@domain.com' },
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid CPF format error', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithInvalidCPFFormat;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        { error: 'Invalid CPF format', expected: 'XXX.XXX.XXX-XX' },
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid CPF and invalid email format error', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithInvalidCPFAndEmailFormat;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        { error: 'Invalid email format', expected: 'mail@domain.com' },
        { error: 'Invalid CPF format', expected: 'XXX.XXX.XXX-XX' },
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid CPF format missing keys error', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithInvalidCPFFormatAndMissingKeys;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        { error: 'Invalid CPF format', expected: 'XXX.XXX.XXX-XX' },
        'name is a required field',
        'email is a required field',
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive a missing keys error while passing an user with address and some missing keys', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithAddressAndMissingKeys;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        'address.state is a required field',
        'address.city is a required field',
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should receive an invalid zip code error while passing an user with address', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
      expected,
    } = validateSchemaWithAddressAndInvalidZipCode;

    YupMock.validate(schemaShape).mockImplementationOnce(() => {
      throw new YupError([
        { error: 'Invalid zip code format', expected: 'XXXXX-XXX' },
      ]);
    });

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toEqual(expected.status);
      expect(error.message).toEqual(expected.message);
    }

    expect(next).not.toBeCalled();
  });

  test('Should validate the schema', async () => {
    const {
      schemaShape,
      payload: { req, res, next },
    } = validateSchemaWithSuccessfully;

    try {
      await validateSchemaMiddleware(schemaShape)(req, res, next);
    } catch (error: any) {}

    expect(next).toBeCalled();
  });
});
