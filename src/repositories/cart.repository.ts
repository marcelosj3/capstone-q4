import { Repository, UpdateResult } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Cart } from '../entities';

class CartRepository {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  create = (cart: Partial<Cart>) => this.repo.create(cart);

  findOne = (uuid: string) => this.repo.findOne({ where: { cartId: uuid } });

  save = async (cart: Cart) => await this.repo.save(cart);

  update = async (
    uuid: string,
    payload: Partial<Cart>
  ): Promise<UpdateResult> => await this.repo.update(uuid, { ...payload });
}

export default new CartRepository();
