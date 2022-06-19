import { User } from '../../../../entities';

export const patchUserPassword = {
  user: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  } as User,
  body: {
    password: '4321',
    oldPassword: '1234',
  },
  expected: {
    status: 200,
    message: {
      userId: '11111111-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      isEmployee: false,
      companyRole: 'client',
    } as User,
  },
};

export const patchUserWithoutOldPassword = {
  user: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  } as User,
  body: {
    password: '4321',
  },
  expected: {
    status: 401,
    message: {
      error: 'invalid credentials',
    },
  },
};

export const patchUserWithIncorrectOldPassword = {
  user: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  } as User,
  body: {
    password: '4321',
    oldPassword: '12345',
  },
  expected: {
    status: 401,
    message: {
      error: 'Invalid old password',
    },
  },
};

export const patchUserEmail = {
  user: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  } as User,
  body: {
    email: 'claramente.naoExiste@mail.com',
  },
  expected: {
    status: 200,
    message: {
      userId: '11111111-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'claramente.naoExiste@mail.com',
      isEmployee: false,
      companyRole: 'client',
    } as User,
  },
};

export const patchUserEmailAndPassword = {
  user: {
    userId: '11111111-0000-4321-abcd-000000000000',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    cpf: '111.111.111-11',
    password: '1234',
  } as User,
  body: {
    email: 'claramente.existe@mail.com',
    password: '4321',
    oldPassword: '1234',
  },
  expected: {
    status: 200,
    message: {
      userId: '11111111-0000-4321-abcd-000000000000',
      name: 'John Doe',
      email: 'claramente.existe@mail.com',
      isEmployee: false,
      companyRole: 'client',
    } as User,
  },
};

// export const patchUserEmailWithoutOldPassword = {
//   user: {
//     userId: '11111111-0000-4321-abcd-000000000000',
//     name: 'John Doe',
//     email: 'johndoe@mail.com',
//     cpf: '111.111.111-11',
//     password: '1234',
//   } as User,
//   body: {
//     email: 'claramente.existe@mail.com',
//     password: '4321',
//   },
//   expected: {
//     status: 401,
//     message: {
//       error: 'invalid credentials',
//     },
//   },
// };
