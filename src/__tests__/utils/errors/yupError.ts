import { BaseError } from '../../../interfaces';
import { YupErrorMessage } from '../types';

export class YupError extends BaseError {
  errors: YupErrorMessage;

  constructor(errors: YupErrorMessage) {
    super();
    this.errors = errors;
  }
}
