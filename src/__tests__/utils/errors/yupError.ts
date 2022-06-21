import { BaseError } from '../../../interfaces/errors/appBaseError.interface';
import { YupErrorMessage } from '../types';

export class YupError extends BaseError {
  errors: YupErrorMessage;

  constructor(errors: YupErrorMessage) {
    super();
    this.errors = errors;
  }
}
