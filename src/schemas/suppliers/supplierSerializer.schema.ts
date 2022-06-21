import { object, string } from 'yup';

import { cnpjMatches } from '../../utils';

export const supplierSerializerSchema = object().shape({
  supplierId: string().uuid().required(),
  name: string().required(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).required(),
});
