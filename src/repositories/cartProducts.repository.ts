import { Repository, UpdateResult } from 'typeorm';

import { AppDataSource } from '../data-source';
import { CartProduct } from '../entities';

class CartProductRepository {
  private repo: Repository<CartProduct>;

  constructor() {
    this.repo = AppDataSource.getRepository(CartProduct);
  }

  create = (CartProduct: Partial<CartProduct>) => this.repo.create(CartProduct);

  save = async (CartProduct: CartProduct) => await this.repo.save(CartProduct);

  delete = async (uuid: string) => await this.repo.delete(uuid);

  update = async (
    uuid: string,
    payload: Partial<CartProduct>
  ): Promise<UpdateResult> => await this.repo.update(uuid, { ...payload });
}

export default new CartProductRepository();
