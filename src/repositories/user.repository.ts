import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  findOne = async (payload: object): Promise<User | null> => {
    return await this.repo.findOneBy({ ...payload });
  };
}

export default new UserRepository();
