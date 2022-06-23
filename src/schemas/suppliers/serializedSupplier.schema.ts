import { object, string } from 'yup';

import { cnpjMatches } from '../../utils';

export const serializedSupplierSchema = object().shape({
  supplierId: string().uuid(),
  name: string(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message),
});
