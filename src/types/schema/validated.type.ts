import { IInsertToCart } from '../../interfaces/cart';
import { IProductCreation } from '../../interfaces/products';
import { IUserCreate, IUserLogin, IUserUpdate } from '../../interfaces/users';

export type Validated =
  | IProductCreation
  | IUserCreate
  | IUserLogin
  | IUserUpdate
  | IInsertToCart;
