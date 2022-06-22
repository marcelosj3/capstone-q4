import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Product, Stock, Supplier } from '../entities';
import { IProductCreation } from '../interfaces/products';
import {
  ProductRepository,
  SupplierRepository,
  UserRepository,
} from '../repositories';
import { serializedProductSchema } from '../schemas';

class ProductService {
  create = async ({ validated }: Request) => {
    let product: Product;
    validated = validated as IProductCreation;
    const {
      quantity,
      unityValue,
      increaseValuePercentage,
      supplier,
      ...productCreate
    } = validated;
    product = await AppDataSource.transaction(async (EntityManager) => {
      const product = EntityManager.create(Product, {
        ...(productCreate as unknown as Product),
      });
      const unityValueToSell: number =
        unityValue + (unityValue * increaseValuePercentage) / 100;
      const stock = EntityManager.create(Stock, {
        quantity,
        unityValueToSell,
        unityValueSupplier: unityValue,
      });
      const supplierExists = await SupplierRepository.findOne(supplier);
      if (!supplierExists) {
        const supplierCreate = EntityManager.create(Supplier, { ...supplier });
        stock.supplier = supplierCreate;
        await EntityManager.save(Supplier, supplierCreate);
      } else {
        stock.supplier = supplierExists;
      }
      product.stock = stock;
      await EntityManager.save(Stock, stock);
      await EntityManager.save(Product, product);
      return product;
    });
    const serializedProduct = await serializedProductSchema.validate(product, {
      stripUnknown: true,
    });
    return {
      statusCode: 201,
      message: serializedProduct,
    };
  };
  get = async ({ decoded }: Request) => {
    const user = await UserRepository.findOne({
      userId: decoded.id,
    });
    let product;
    if (user?.isEmployee) {
      product = await ProductRepository.get();
      console.log(product);
    }
    return { statusCode: 200, message: product };
  };
}

export default new ProductService();
