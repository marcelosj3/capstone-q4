export const cpfMatch = {
  regex: /^\d{2}\/\d{2}\/\d{4}$/gm as RegExp,
  message: {
    error: 'Invalid format',
    expected: '999.999.999-99',
  },
};
