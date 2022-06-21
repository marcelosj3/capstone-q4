import { IProductCreation } from '../../interfaces/products';
import { IUserCreateAndUpdate } from '../../interfaces/users';

export type Validated = IUserCreateAndUpdate | IProductCreation;
