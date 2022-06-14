export const expiryDateMatches = {
  regex: /^\d{2}\/\d{2}\/\d{4}$/gm,
  message: {
    error: 'Invalid format',
    expected: 'dd/mm/aaaa',
  },
};
