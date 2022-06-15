import { User } from '../../../entities';

export const userClientWithoutAddress = {
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

export const userClientWithAddress = {
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

export const userEmployeeWithoutAddress = {
  payload: {
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    cpf: '333.333.333-33',
    password: '1234',
    isEmployee: true,
    companyRole: 'employee',
  },
  response: {
    userId: '22222222-0000-4321-abcd-000000000000',
    name: 'Kate Austen',
    email: 'kateausten@lost.com',
    isEmployee: true,
    companyRole: 'employee',
  } as User,
};

export const userEmployeeWithAddress = {
  payload: {
    name: 'Juliet Burke',
    email: 'julietburke@mail.com',
    cpf: '444.444.444-44',
    password: '1234',
    isEmployee: true,
    companyRole: 'employee',
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

export const userManagerWithoutAddress = {
  payload: {
    name: 'Carlão do Pastel',
    email: 'carlaodopastel@mail.com',
    cpf: '555.555.555-55',
    password: '1234',
    isEmployee: true,
    companyRole: 'manager',
  },
  response: {
    userId: '44444444-0000-4321-abcd-000000000000',
    name: 'Carlão do Pastel',
    email: 'carlaodopastel@mail.com',
    isEmployee: true,
    companyRole: 'manager',
  } as User,
};

export const userManagerWithAddress = {
  payload: {
    name: 'Cramu Nhao',
    email: 'cramunhao@mail.com',
    cpf: '666.666.666-66',
    password: '1234',
    isEmployee: true,
    companyRole: 'manager',
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

export const userAdminWithoutAddress = {
  payload: {
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    cpf: '777.777.777-77',
    password: '1234',
    isEmployee: true,
    companyRole: 'admin',
  },
  response: {
    userId: '66666666-0000-4321-abcd-000000000000',
    name: 'Richard Judas',
    email: 'richardjudas@mail.com',
    isEmployee: true,
    companyRole: 'admin',
  } as User,
};

export const userAdminWithAddress = {
  payload: {
    name: 'Gi Sus',
    email: 'gisus@cloud.com',
    cpf: '888.888.888-88',
    password: '1234',
    isEmployee: true,
    companyRole: 'admin',
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

export const userList = [
  userClientWithoutAddress,
  userClientWithAddress,
  userEmployeeWithoutAddress,
  userEmployeeWithAddress,
  userManagerWithoutAddress,
  userManagerWithAddress,
  userAdminWithoutAddress,
  userAdminWithAddress,
];

export const userListWithoutAddress = [
  userClientWithoutAddress,
  userEmployeeWithoutAddress,
  userManagerWithoutAddress,
  userAdminWithoutAddress,
];

export const userListWithAddress = [
  userClientWithAddress,
  userEmployeeWithAddress,
  userManagerWithAddress,
  userAdminWithAddress,
];

export const userListResponse = userList.map((user) => user.response);

export const userListPayload = userList.map((user) => user.payload);
