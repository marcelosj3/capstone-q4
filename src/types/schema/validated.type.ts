import {
  IInsertToCart,
  IProductCreation,
  IUserCreate,
  IUserLogin,
  IUserUpdate,
} from '../../interfaces';

export type TValidated =
  | IProductCreation
  | IUserCreate
  | IUserLogin
  | IUserUpdate
  | IInsertToCart;
