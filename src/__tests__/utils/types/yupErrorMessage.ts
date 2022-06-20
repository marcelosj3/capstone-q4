import { IYupErrorMessageObject } from '../interfaces/errors';

export type YupErrorMessage =
  | string[]
  | (string | IYupErrorMessageObject)[]
  | IYupErrorMessageObject[];
