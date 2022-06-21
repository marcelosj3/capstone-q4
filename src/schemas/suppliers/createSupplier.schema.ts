import { object, string, lazy, mixed } from 'yup';

import { cnpjMatches } from '../../utils';
import { createAddressSchema } from '../addresses';

export const createSupplierSchema = object().shape({
  name: string().required(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).required(),
  address: lazy((value) => {
    if (value !== undefined) {
      return createAddressSchema;
    }

    return mixed().notRequired();
  }),
});
