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
  get = async () => this.repo.find();
}

export default new ProductRepository();
