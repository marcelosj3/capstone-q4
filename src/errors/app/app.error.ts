import { BaseError } from '../../interfaces';

export class AppError extends BaseError {
  statusCode: number;
  message: string | object;

  constructor(message: string | object, statusCode: number = 500) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
