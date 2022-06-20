import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { UUIDMock } from '../../../__mocks__';
import { createProduct } from './__scenarios__';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

describe('Create a product', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error('Error during test data source initialization', err)
      );
  });
  afterAll(async () => {
    connection.destroy();
  });
  test('Should create a product successfully', async () => {
    const { product, payload, expected } = createProduct;
    UUIDMock.v4.mockReturnValueOnce(product.productId);
  });
});
