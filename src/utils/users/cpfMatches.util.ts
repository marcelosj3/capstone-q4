export const cpfMatches = {
  regex: /^\d{2}\/\d{2}\/\d{4}$/gm as RegExp,
  message: {
    error: 'Invalid format',
    expected: 'XXX.XXX.XXX-XX',
  },
};
