export const expiryDateMatches = {
  regex: /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/gm,
  message: {
    message: {
      error: 'Invalid expiry date format',
      expected: 'DD/MM/YYYY',
    },
  },
};
