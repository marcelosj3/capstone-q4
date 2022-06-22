import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Product, Stock, Supplier } from '../entities';
import { IProductCreation } from '../interfaces';
import {
  ProductRepository,
  SupplierRepository,
  UserRepository,
} from '../repositories';
import { serializedProductSchema } from '../schemas';

class ProductService {
  create = async ({ validated }: Request) => {
    let product: Product;
    const {
      quantity,
      unityValue,
      increaseValuePercentage,
      supplier,
      ...productCreate
    } = validated as IProductCreation;

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
    let products;
    let productsToSerealize: Array<any> = [];
    if (user?.isEmployee) {
      products = await ProductRepository.get();
      const toUniqueProducts = products.map(
        ({ name, brand, category, expiryDate }) => {
          return `${name}-${brand}-${category}-${expiryDate}`;
        }
      );
      const uniqueProducts = [...new Set(toUniqueProducts)];
      for (let i = 0; i < uniqueProducts.length; i++) {
        const [name, brand, category, expiryDate] =
          uniqueProducts[i].split('-');
        const stockProduct: Array<any> = [];
        const product = await ProductRepository.findOne({
          name,
          brand,
          category,
          expiryDate,
        });
        const productStock = await ProductRepository.findBy({
          name,
          brand,
          category,
          expiryDate,
        });
        productStock.forEach((product) => stockProduct.push(product.stock));
        const totalQuantity = productStock.reduce(
          (acc, { stock: { quantity } }) => acc + quantity,
          0
        );
        const maxValueToSell = productStock.reduce(
          (acc, { stock: { unityValueToSell } }) =>
            Math.max(acc, unityValueToSell),
          0
        );
        stockProduct.forEach((stockSupplier) => {
          stockSupplier.productId = product?.productId;
          stockSupplier.supplierName = stockSupplier.supplier.name;
          stockSupplier.supplierCNPJ = stockSupplier.supplier.cnpj;
          delete stockSupplier.supplier;
          delete stockSupplier.increaseValuePercentage;
          delete stockSupplier.unityValueSupplier;
        });
        const result = {
          name: product?.name,
          brand: product?.brand,
          category: product?.category,
          description: product?.description,
          expiryDate: product?.expiryDate,
          quantity: totalQuantity,
          unityValueToSell: maxValueToSell,
          onSale: product?.onSale,
          stock: stockProduct,
        };
        productsToSerealize.push(result);
      }
    } else {
      products = await ProductRepository.get();
      const toUniqueProducts = products.map(
        ({ name, brand, category, expiryDate }) => {
          return `${name}-${brand}-${category}-${expiryDate}`;
        }
      );
      const uniqueProducts = [...new Set(toUniqueProducts)];
      for (let i = 0; i < uniqueProducts.length; i++) {
        const [name, brand, category, expiryDate] =
          uniqueProducts[i].split('-');
        const stockProduct: Array<any> = [];
        const product = await ProductRepository.findOne({
          name,
          brand,
          category,
          expiryDate,
        });
        const productStock = await ProductRepository.findBy({
          name,
          brand,
          category,
          expiryDate,
        });
        productStock.forEach((product) => stockProduct.push(product.stock));
        const totalQuantity = productStock.reduce(
          (acc, { stock: { quantity } }) => acc + quantity,
          0
        );
        const maxValueToSell = productStock.reduce(
          (acc, { stock: { unityValueToSell } }) =>
            Math.max(acc, unityValueToSell),
          0
        );
        let available = totalQuantity > 0 ? true : false;
        console.log(available);
        stockProduct.forEach((stockSupplier) => {
          stockSupplier.productId = product?.productId;
          delete stockSupplier.supplier;
          delete stockSupplier.increaseValuePercentage;
          delete stockSupplier.unityValueSupplier;
          delete stockSupplier.unityValueToSell;
        });
        const result = {
          name: product?.name,
          brand: product?.brand,
          category: product?.category,
          description: product?.description,
          expiryDate: product?.expiryDate,
          quantity: totalQuantity,
          unityValueToSell: maxValueToSell,
          onSale: product?.onSale,
          isAvailable: available,
          stock: stockProduct,
        };
        productsToSerealize.push(result);
      }
    }
    return { statusCode: 200, message: productsToSerealize };
  };
}

export default new ProductService();
