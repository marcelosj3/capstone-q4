import { Address, User } from '../../../../entities';
import { CompanyRole } from '../../../../types';

export interface IUserPayloadResponse {
  payload: {
    name: string;
    email: string;
    cpf: string;
    password: string;
    isEmployee?: boolean;
    companyRole?: CompanyRole;
    address?: Partial<Address>;
  };
  response: Partial<User>;
}
