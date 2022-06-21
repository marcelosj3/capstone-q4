import { hash } from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  all = async (): Promise<User[]> =>
    await this.repo.find({ relations: ['address'] });

  create = (user: User) => this.repo.create(user);

  delete = async (uuid: string): Promise<DeleteResult> =>
    await this.repo.delete(uuid);

  findOne = async (payload: object): Promise<User | null> => {
    return await this.repo.findOne({
      where: { ...payload },
    });
  };

  findOneWithCart = async (payload: object): Promise<User | null> => {
    return await this.repo.findOne({
      where: { ...payload },
      relations: [
        'cart',
        'cart.cartProducts',
        'cart.cartProducts.product',
        'cart.cartProducts.product.stock',
      ],
    });
  };

  findOneWithAddress = async (payload: object): Promise<User | null> => {
    return await this.repo.findOne({
      where: { ...payload },
      relations: ['address'],
    });
  };

  save = async (user: User): Promise<User> => await this.repo.save(user);

  update = async (
    uuid: string,
    payload: Partial<User>
  ): Promise<UpdateResult> => {
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }
    return await this.repo.update(uuid, { ...payload });
  };
}

export default new UserRepository();
