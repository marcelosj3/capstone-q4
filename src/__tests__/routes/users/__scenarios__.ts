export const createUserWithoutToken = {
  payload: {},
  expected: {
    status: 401,
    message: {
      message: 'missing authorization token',
    },
  },
};
