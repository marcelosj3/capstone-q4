export const zipCodeMatches = {
  regex: /^\d{5}\-\d{3}$/gm as RegExp,
  message: {
    error: 'Invalid format',
    expected: 'XXXXX-XXX',
  },
};
