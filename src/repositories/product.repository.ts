import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Product } from '../entities';

class ProductRepository {
  private repo: Repository<Product>;
  constructor() {
    this.repo = AppDataSource.getRepository(Product);
  }
  create = (product: Product) => this.repo.create(product);

  findOne = async (payload: object): Promise<Product | null> => {
    return await this.repo.findOne({ where: { ...payload } });
  };

  findOneWithStock = async (payload: object): Promise<Product | null> => {
    return await this.repo.findOne({
      where: { ...payload },
      relations: ['stock', 'stock.supplier'],
    });
  };

  // const product = await AppDataSource.getRepository(Product).findOne({
  //   where: { productId: productId },
  //   relations: ['stock', 'stock.supplier'],
  // })
}

export default new ProductRepository();
