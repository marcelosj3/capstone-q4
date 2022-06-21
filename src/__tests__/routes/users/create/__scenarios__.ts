import {
  userClientWithAddress,
  userEmployeeWithAddress,
  userManagerWithAddress,
} from '../../../utils/users/usersWithAddress';
import {
  userAdminWithoutAddress,
  userClientWithoutAddress,
  userClientWithoutAddress2,
  userEmployeeWithoutAddress,
  userManagerWithoutAddress,
  userManagerWithoutAddress2,
} from '../../../utils/users/usersWithoutAddress';

export const createUserWithMissingKeys = {
  payload: { ...userClientWithoutAddress.payload, email: '' },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: ['email is a required field'],
    },
  },
};

export const createUserWithInvalidEmailFormat = {
  payload: {
    ...userClientWithoutAddress.payload,
    email: 'invalidformat.com',
  },
  expected: {
    status: 400,
    message: {
      error: 'Invalid email format',
      expected: 'mail@domain.com',
    },
  },
};

export const createUserWithInvalidCpfFormat = {
  payload: {
    ...userClientWithoutAddress.payload,
    cpf: '12345678901',
  },
  expected: {
    status: 400,
    message: {
      error: 'Invalid CPF format',
      expected: 'XXX.XXX.XXX-XX',
    },
  },
};

export const createUserSuccessfuly = {
  user: userClientWithoutAddress.response,
  payload: userClientWithoutAddress.payload,
  expected: {
    status: 201,
    message: userClientWithoutAddress.response,
  },
};

export const createUserWithAlreadyExistingEmail = {
  payload: userClientWithoutAddress.payload,
  expected: {
    status: 409,
    message: { error: 'email already exists' },
  },
};

export const createUserWithAlreadyExistingCPF = {
  payload: {
    ...userClientWithoutAddress.payload,
    email: 'anothermail@domain.com',
  },
  expected: {
    status: 409,
    message: { error: 'CPF already exists' },
  },
};

export const createUserSuccessfulyAndNormalizeNameValue = {
  payload: {
    ...userClientWithoutAddress.payload,
    email: 'noconflict@email.com',
    cpf: '012.210.210-01',
    name: 'DAVEY STRUSS',
  },
  expected: {
    status: 201,
    message: userClientWithAddress.response,
  },
};

export const createUserSuccessfulyAndNormalizeEmailValue = {
  payload: {
    ...userClientWithoutAddress.payload,
    email: 'NORMALiZEThisValue@MAil.Com',
    cpf: '210.012.210-01',
  },
  expected: {
    status: 201,
    message: {
      ...userClientWithAddress.response,
      email: 'normalizethisvalue@mail.com',
    },
  },
};

export const createUserWithAddressAndMissingKeys = {
  payload: {
    ...userClientWithAddress.payload,
    email: '',
    address: { ...userClientWithAddress.payload.address, state: '' },
  },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: [
        'email is a required field',
        'address.state is a required field',
      ],
    },
  },
};

export const createUserWithAddressAndInvaliZipCodeFormat = {
  payload: {
    ...userClientWithAddress.payload,
    address: { ...userClientWithAddress.payload.address, zipCode: '65045010' },
  },
  expected: {
    status: 400,
    message: {
      error: 'Invalid zip code format',
      expected: 'XXXXX-XXX',
    },
  },
};

export const createUserWithAddressSuccessfully = {
  user: userClientWithAddress.response,
  payload: userClientWithAddress.payload,
  expected: {
    status: 201,
    message: userClientWithAddress.response,
  },
};

export const createEmployeeUserWithoutToken = {
  payload: userEmployeeWithoutAddress.payload,
  expected: {
    status: 401,
    message: { error: 'Missing authorization token' },
  },
};

export const createEmployeeUserWithMalformedJwt = {
  payload: userEmployeeWithoutAddress.payload,
  expected: {
    status: 401,
    message: { error: 'jwt malformed' },
  },
};

export const createEmployeeUserWithInvalidToken = {
  payload: userEmployeeWithoutAddress.payload,
  expected: {
    status: 401,
    message: { error: 'invalid token' },
  },
};

export const createClientUserWithEmployeeToken = {
  userToCreate: userClientWithoutAddress2.response,
  tokenUser: userEmployeeWithAddress.response,
  payload: userClientWithoutAddress2.payload,
  expected: {
    status: 201,
    message: userClientWithoutAddress2.response,
  },
};

export const createEmployeeUserWithEmployeeToken = {
  tokenUser: userEmployeeWithAddress.response,
  payload: userEmployeeWithoutAddress.payload,
  expected: {
    status: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const createEmployeeUserWithManagerToken = {
  userToCreate: userEmployeeWithoutAddress.response,
  tokenUser: userManagerWithAddress.response,
  payload: userEmployeeWithoutAddress.payload,
  expected: {
    status: 201,
    message: userEmployeeWithoutAddress.response,
  },
};

export const createManagerUserWithManagerToken = {
  tokenUser: userManagerWithAddress.response,
  payload: userManagerWithoutAddress.payload,
  expected: {
    status: 401,
    message: { error: 'You have no permission to access this information' },
  },
};

export const createManagerUserWithAdminToken = {
  userToCreate: userManagerWithoutAddress2.response,
  tokenUser: userAdminWithoutAddress.response,
  payload: userManagerWithoutAddress2.payload,
  expected: {
    status: 201,
    message: userManagerWithoutAddress2.response,
  },
};

export const createInvalidRoleUserWithAnyValidUserToken = {
  tokenUser: userAdminWithoutAddress.response,
  payload: { ...userManagerWithoutAddress.payload, companyRole: 'cleaner' },
  expected: {
    status: 400,
    message: {
      error: 'Invalid company role',
      expected: ['client', 'employee', 'manager'],
    },
  },
};
