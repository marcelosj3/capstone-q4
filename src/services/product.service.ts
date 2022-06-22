import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Product, Stock, Supplier } from '../entities';
import { IProductCreation } from '../interfaces';
import { ProductRepository, SupplierRepository } from '../repositories';
import { serializedProductSchema } from '../schemas';

class ProductService {
  create = async ({ validated }: Request) => {
    let product: Product;
    const {
      quantity,
      unityValue,
      increaseValuePercentage,
      supplier,
      ...productInfo
    } = validated as IProductCreation;

    const productFound = await ProductRepository.findOneWithStock(productInfo);

    if (productFound && productFound.stock.supplier.cnpj === supplier.cnpj) {
      product = await AppDataSource.transaction(async (entityManager) => {
        const { stock } = productFound;

        const newQuantity = stock.quantity + quantity;

        await entityManager.update(Stock, stock.stockId, {
          quantity: newQuantity,
        });

        const product = await entityManager.findOne(Product, {
          where: { productId: productFound.productId },
          relations: ['stock', 'stock.supplier'],
        });

        return product!;
      });
    } else {
      product = await AppDataSource.transaction(async (entityManager) => {
        const product = entityManager.create(Product, {
          ...(productInfo as unknown as Product),
        });

        const unityValueToSell: number =
          unityValue + (unityValue * increaseValuePercentage) / 100;

        const stock = entityManager.create(Stock, {
          quantity,
          unityValueToSell,
          unityValueSupplier: unityValue,
        });

        const supplierExists = await SupplierRepository.findOne(supplier);

        if (!supplierExists) {
          const supplierCreate = entityManager.create(Supplier, {
            ...supplier,
          });

          stock.supplier = supplierCreate;
          await entityManager.save(Supplier, supplierCreate);
        } else {
          stock.supplier = supplierExists;
        }

        product.stock = stock;

        await entityManager.save(Stock, stock);
        await entityManager.save(Product, product);

        return product;
      });
    }

    const serializedProduct = await serializedProductSchema.validate(product, {
      stripUnknown: true,
    });

    return {
      statusCode: 201,
      message: serializedProduct,
    };
  };
}

export default new ProductService();
