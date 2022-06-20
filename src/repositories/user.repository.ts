import { hash } from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  create = (user: User) => this.repo.create(user);

  all = async (): Promise<User[]> =>
    await this.repo.find({ relations: ['address'] });

  findOne = async (payload: object): Promise<User | null> => {
    return await this.repo.findOne({
      where: { ...payload },
      relations: ['address'],
    });
  };
  update = async (uuid: string, payload: Partial<User>) => {
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }
    return await this.repo.update(uuid, { ...payload });
  };

  save = async (user: User): Promise<User> => await this.repo.save(user);

  delete = async (uuid: string): Promise<DeleteResult> =>
    await this.repo.delete(uuid);
}

export default new UserRepository();
