import { IInsertToCart } from '../../interfaces';
import { IProductCreation } from '../../interfaces/products';
import { IUserCreateAndUpdate } from '../../interfaces/users';

export type Validated = IUserCreateAndUpdate | IInsertToCart | IProductCreation;
