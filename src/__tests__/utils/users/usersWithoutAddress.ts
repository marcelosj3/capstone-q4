import { User } from '../../../entities';
import { CompanyRole } from '../../../types';
import { IUserPayloadResponse } from '../interfaces/populateDatabase';

export const userClientWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  },
  response: {
    userId: '00000000-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
  },
};

export const userEmployeeWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    cpf: '333.333.333-33',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.EMPLOYEE,
  },
  response: {
    userId: '22222222-0000-4321-abcd-000000000000',
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    isEmployee: true,
    companyRole: 'employee',
  } as User,
};

export const userManagerWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Carlão do Pastel',
    email: 'carlaodopastel@mail.com',
    cpf: '555.555.555-55',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.MANAGER,
  },
  response: {
    userId: '44444444-0000-4321-abcd-000000000000',
    name: 'Carlão do Pastel',
    email: 'carlaodopastel@mail.com',
    isEmployee: true,
    companyRole: 'manager',
  } as User,
};

export const userAdminWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    cpf: '777.777.777-77',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.ADMIN,
  },
  response: {
    userId: '66666666-0000-4321-abcd-000000000000',
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    isEmployee: true,
    companyRole: 'admin',
  } as User,
};

export const userListWithoutAddress: IUserPayloadResponse[] = [
  userClientWithoutAddress,
  userEmployeeWithoutAddress,
  userManagerWithoutAddress,
  userAdminWithoutAddress,
];

export const userListWithoutAddressResponse = userListWithoutAddress.map(
  (user: IUserPayloadResponse) => user.response
);

export const userListWithoutAddressPayload = userListWithoutAddress.map(
  (user: IUserPayloadResponse) => user.payload
);
