export const cpfMatches = {
  regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/gm as RegExp,
  message: {
    message: {
      error: 'Invalid cpf format',
      expected: 'XXX.XXX.XXX-XX',
    },
  },
};
