export const zipCodeMatches = {
  regex: /(^[0-9]{5})-([0-9]{3}$)/gm as RegExp,
  message: {
    error: 'Invalid format',
    expected: 'XXXXX-XXX',
  },
};
