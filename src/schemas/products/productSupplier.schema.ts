import { object, string } from 'yup';

import { cnpjMatches } from '../../utils';

export const productSupplierSchema = object().shape({
  supplierId: string().required(),
  name: string().required(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).required(),
});
