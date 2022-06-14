import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Address } from '../entities';

class AddressRepository {
  private repo: Repository<Address>;

  constructor() {
    this.repo = AppDataSource.getRepository(Address);
  }

  create = (address: Address) => this.repo.create(address);

  save = async (address: Address) => await this.repo.save(address);
}

export default new AddressRepository();
