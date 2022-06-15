export const zipCodeMatches = {
  regex: /^\d{5}\-\d{3}$/gm as RegExp,
  message: {
    message: {
      error: 'Invalid zip code format',
      expected: 'XXXXX-XXX',
    },
  },
};
