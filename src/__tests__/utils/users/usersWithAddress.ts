import { User } from '../../../entities';
import { CompanyRole } from '../../../types';
import { IUserPayloadResponse } from '../interfaces/populateDatabase';

export const userClientWithAddress: IUserPayloadResponse = {
  payload: {
    name: 'Davey Struss',
    email: 'daveystruss@mail.com',
    cpf: '222.222.222-22',
    password: '1234',
    address: {
      state: 'Maranhão',
      city: 'São Luís',
      district: 'Jardim Alvorada',
      street: 'R. Almeida Galhardo',
      houseNumber: 1212,
      additionalAddressData: '',
      zipCode: '65045-010',
    },
  },
  response: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'Davey Struss',
    email: 'daveystruss@mail.com',
    address: [
      {
        addressId: '00000000-1111-4321-abcd-000000000000',
        state: 'Maranhão',
        city: 'São Luís',
        district: 'Jardim Alvorada',
        street: 'R. Almeida Galhardo',
        houseNumber: 1212,
        zipCode: '65045-010',
        additionalAddressData: '',
        isMain: true,
      },
    ],
  } as User,
};

export const userEmployeeWithAddress: IUserPayloadResponse = {
  payload: {
    name: 'Juliet Burke',
    email: 'julietburke@mail.com',
    cpf: '444.444.444-44',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.EMPLOYEE,
    address: {
      state: 'Maranhão',
      city: 'São Luís',
      district: 'Jardim Alvorada',
      street: 'R. Almeida Galhardo',
      houseNumber: 1212,
      zipCode: '65045-010',
      additionalAddressData: '',
    },
  },
  response: {
    userId: '33333333-0000-4321-abcd-000000000000',
    name: 'Juliet Burke',
    email: 'julietburke@mail.com',
    isEmployee: true,
    companyRole: 'employee',
    address: [
      {
        addressId: '11111111-1111-4321-abcd-000000000000',
        state: 'Maranhão',
        city: 'São Luís',
        district: 'Jardim Alvorada',
        street: 'R. Almeida Galhardo',
        houseNumber: 1212,
        zipCode: '65045-010',
        additionalAddressData: '',
        isMain: true,
      },
    ],
  } as User,
};

export const userManagerWithAddress: IUserPayloadResponse = {
  payload: {
    name: 'Cramu Nhao',
    email: 'cramunhao@mail.com',
    cpf: '666.666.666-66',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.MANAGER,
    address: {
      state: 'Espírito Santo',
      city: 'Ecoporanga',
      district: 'Homero Amante',
      street: 'R. Maria De Souza Pinto',
      houseNumber: 666,
      zipCode: '29850-000',
      additionalAddressData: '',
    },
  },
  response: {
    userId: '55555555-0000-4321-abcd-000000000000',
    name: 'Cramu Nhao',
    email: 'cramunhao@mail.com',
    isEmployee: true,
    companyRole: 'manager',
    address: [
      {
        addressId: '22222222-1111-4321-abcd-000000000000',
        state: 'Espírito Santo',
        city: 'Ecoporanga',
        district: 'Homero Amante',
        street: 'R. Maria De Souza Pinto',
        houseNumber: 666,
        zipCode: '29850-000',
        additionalAddressData: '',
        isMain: true,
      },
    ],
  } as User,
};

export const userAdminWithAddress: IUserPayloadResponse = {
  payload: {
    name: 'Gi Sus',
    email: 'gisus@cloud.com',
    cpf: '888.888.888-88',
    password: '1234',
    isEmployee: true,
    companyRole: CompanyRole.ADMIN,
    address: {
      state: 'São Paulo',
      city: 'São Paulo',
      district: 'Paraíso',
      street: 'Rua Evaristo de Morais',
      houseNumber: 100,
      zipCode: '04007-070',
      additionalAddressData: '',
    },
  },
  response: {
    userId: '77777777-0000-4321-abcd-000000000000',
    name: 'Gi Sus',
    email: 'gisus@cloud.com',
    isEmployee: true,
    companyRole: 'admin',
    address: [
      {
        addressId: '33333333-1111-4321-abcd-000000000000',
        state: 'São Paulo',
        city: 'São Paulo',
        district: 'Paraíso',
        street: 'Rua Evaristo de Morais',
        houseNumber: 100,
        zipCode: '04007-070',
        additionalAddressData: '',
        isMain: true,
      },
    ],
  } as User,
};

export const userListWithAddress: IUserPayloadResponse[] = [
  userClientWithAddress,
  userEmployeeWithAddress,
  userManagerWithAddress,
  userAdminWithAddress,
];

export const userListWithAddressResponse = userListWithAddress.map(
  (user: IUserPayloadResponse) => user.response
);

export const userListWithAddressPayload = userListWithAddress.map(
  (user: IUserPayloadResponse) => user.payload
);
