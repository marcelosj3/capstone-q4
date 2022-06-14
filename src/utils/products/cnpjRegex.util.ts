export const cnpjMatches = {
  regex: /^\d{2}\.\d{3}\.\d{3}\/0{3}(1|2)\-\d{2}$/gm,
  message: {
    error: 'Invalid format',
    expected: 'XX.XXX.XXX/XXXX-XX',
  },
};
