import { object, string, lazy, mixed } from 'yup';

import { cnpjMatches } from '../../utils';
import { createAddressSchema } from '../addresses';

export const updateSupplierSchema = object().shape({
  name: string(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message),
  address: lazy((value) => {
    if (value !== undefined) {
      return createAddressSchema;
    }

    return mixed().notRequired();
  }),
});
