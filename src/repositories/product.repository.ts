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
  findOneClient = async (payload: object): Promise<Product | null> =>
    this.repo.findOne({ where: { ...payload }, relations: ['stock'] });
  get = async () => this.repo.find({ relations: ['stock', 'stock.supplier'] });
  findBy = async (payload: object) =>
    await this.repo.find({
      where: { ...payload },
      relations: ['stock', 'stock.supplier'],
    });

  findOneWithStock = async (payload: object): Promise<Product | null> => {
    return await this.repo.findOne({
      where: { ...payload },
      relations: ['stock', 'stock.supplier'],
    });
  };
}

export default new ProductRepository();
