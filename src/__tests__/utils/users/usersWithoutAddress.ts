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
    isActive: false,
    companyRole: CompanyRole.CLIENT,
  } as User,
};

export const userEmployeeWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    cpf: '333.333.333-33',
    password: '1234',
    companyRole: CompanyRole.EMPLOYEE,
  },
  response: {
    userId: '22222222-0000-4321-abcd-000000000000',
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    isActive: false,
    companyRole: CompanyRole.EMPLOYEE,
  } as User,
};

export const userManagerWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Carlão Do Pastel',
    email: 'carlaodopastel@mail.com',
    cpf: '555.555.555-55',
    password: '1234',
    companyRole: CompanyRole.MANAGER,
  },
  response: {
    userId: '44444444-0000-4321-abcd-000000000000',
    name: 'Carlão Do Pastel',
    email: 'carlaodopastel@mail.com',
    isActive: false,
    companyRole: CompanyRole.MANAGER,
  } as User,
};

export const userAdminWithoutAddress: IUserPayloadResponse = {
  payload: {
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    cpf: '777.777.777-77',
    password: '1234',
    companyRole: CompanyRole.ADMIN,
  },
  response: {
    userId: '66666666-0000-4321-abcd-000000000000',
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    isActive: false,
    companyRole: CompanyRole.ADMIN,
  } as User,
};

export const userClientWithoutAddress2: IUserPayloadResponse = {
  payload: {
    name: 'Doe Johnny',
    email: 'doejohnny@mail.com',
    cpf: '999.999.999-99',
    password: '1234',
    companyRole: CompanyRole.CLIENT,
  },
  response: {
    userId: '12345678-0000-4321-abcd-000000000000',
    name: 'Doe Johnny',
    email: 'doejohnny@mail.com',
    isActive: false,
    companyRole: CompanyRole.CLIENT,
  } as User,
};

export const userManagerWithoutAddress2: IUserPayloadResponse = {
  payload: {
    name: 'Januário Da Esquina',
    email: 'januariodaesquina@mail.com',
    cpf: '101.101.101-01',
    password: '1234',
    companyRole: CompanyRole.MANAGER,
  },
  response: {
    userId: '10101010-0000-4321-abcd-000000000000',
    name: 'Januário Da Esquina',
    email: 'januariodaesquina@mail.com',
    isActive: false,
    companyRole: CompanyRole.MANAGER,
  } as User,
};

export const userListWithoutAddress: IUserPayloadResponse[] = [
  userClientWithoutAddress,
  userEmployeeWithoutAddress,
  userManagerWithoutAddress,
  userAdminWithoutAddress,
  userClientWithoutAddress2,
];

export const userListWithoutAddressResponse = userListWithoutAddress.map(
  (user: IUserPayloadResponse) => user.response
);

export const userListWithoutAddressPayload = userListWithoutAddress.map(
  (user: IUserPayloadResponse) => user.payload
);
