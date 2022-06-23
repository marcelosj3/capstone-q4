import { Request } from 'express';

import { Address, User } from '../../../../entities';

export const patchUserPassword = {
  payload: {
    decoded: {
      id: '00000000-0000-4321-abcd-000000000000',
    },
    validated: {
      password: '4321',
      oldPassword: '1234',
    },
  } as Request,
  expected: {
    status: 200,
    message: {
      userId: '00000000-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      isActive: true,
      companyRole: 'client',
      address: [] as Address[],
    } as User,
  },
};

export const patchUserWithoutOldPassword = {
  payload: {
    decoded: {
      id: '00000000-0000-4321-abcd-000000000000',
    },
    validated: {
      password: '4321',
    },
  } as Request,
  expected: {
    status: 401,
    message: {
      error: 'Missing old password key',
      description:
        "In order to update the password, an 'oldPassword' key is necessary",
    },
  },
};

export const patchUserWithIncorrectOldPassword = {
  payload: {
    decoded: {
      id: '00000000-0000-4321-abcd-000000000000',
    },
    validated: {
      password: '4321',
      oldPassword: '12345',
    },
  } as Request,
  expected: {
    status: 401,
    message: {
      error: 'Invalid old password',
    },
  },
};

export const patchUserEmail = {
  payload: {
    decoded: {
      id: '00000000-0000-4321-abcd-000000000000',
    },
    validated: {
      email: 'claramente.naoExiste@mail.com',
    },
  } as Request,
  expected: {
    status: 200,
    message: {
      userId: '00000000-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'claramente.naoExiste@mail.com',
      isEmployee: false,
      companyRole: 'client',
      address: [] as Address[],
    } as User,
  },
};

export const patchUserEmailAndPassword = {
  payload: {
    decoded: {
      id: '00000000-0000-4321-abcd-000000000000',
    },
    validated: {
      email: 'claramente.existe@mail.com',
      password: '4321',
      oldPassword: '1234',
    },
  } as Request,
  expected: {
    status: 200,
    message: {
      userId: '00000000-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'claramente.existe@mail.com',
      isEmployee: false,
      companyRole: 'client',
      address: [] as Address[],
    } as User,
  },
};
