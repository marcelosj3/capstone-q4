import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Supplier } from '../entities';

class SupplierRepository {
  private repo: Repository<Supplier>;

  constructor() {
    this.repo = AppDataSource.getRepository(Supplier);
  }
  create = (supplier: Supplier) => this.repo.create(supplier);
  findOne = async (payload: object): Promise<Supplier | null> => {
    return await this.repo.findOne({ where: { ...payload } });
  };
}

export default new SupplierRepository();
