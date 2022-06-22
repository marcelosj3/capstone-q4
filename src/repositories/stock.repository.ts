import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Stock } from '../entities';

class StockRepository {
  private repo: Repository<Stock>;

  constructor() {
    this.repo = AppDataSource.getRepository(Stock);
  }
  create = (stock: Stock) => this.repo.create(stock);

  findOne = async (payload: object): Promise<Stock | null> => {
    return await this.repo.findOne({ where: { ...payload } });
  };
  get = async () => await this.repo.find();
}

export default new StockRepository();
