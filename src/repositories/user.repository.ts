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

  create = (user: User) => this.repo.create(user);

  save = async (user: User) => await this.repo.save(user);
}

export default new UserRepository();
