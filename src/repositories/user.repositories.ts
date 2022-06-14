import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

interface IUserRepo {
  getAll: () => Promise<User[]>;
}
class UserRepository implements IUserRepo {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }
  getAll = async () => await this.repo.find();
}

export default new UserRepository();
