import { userClientWithoutAddress } from '../../../utils/users/usersWithoutAddress';

export const loginUserWithMissingEmailKey = {
  payload: { ...userClientWithoutAddress.payload, email: undefined },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: ['email is a required field'],
    },
  },
};

export const loginUserWithMissingPasswordKey = {
  payload: { ...userClientWithoutAddress.payload, password: undefined },
  expected: {
    status: 400,
    message: {
      error: 'Missing keys',
      requiredFields: ['password is a required field'],
    },
  },
};

export const loginUserWithUnexistingUserEmail = {
  payload: {
    ...userClientWithoutAddress.payload,
    email: 'thisemaildoesnotexists@mail.com',
  },
  expected: {
    status: 401,
    message: {
      error: 'invalid credentials',
    },
  },
};

export const loginUserWithInvalidPassword = {
  payload: {
    ...userClientWithoutAddress.payload,
    password: 'not-a-valid-password',
  },
  expected: {
    status: 401,
    message: {
      error: 'invalid credentials',
    },
  },
};

export const loginUserSuccessfully = {
  payload: {
    ...userClientWithoutAddress.payload,
  },
  expected: {
    status: 200,
    message: {
      token: 'valid.user.token',
    },
  },
};
