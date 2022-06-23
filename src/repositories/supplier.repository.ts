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
  get = async () => await this.repo.find();
}

export default new SupplierRepository();
