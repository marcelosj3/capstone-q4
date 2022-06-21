import { number, object, string } from 'yup';

import { cnpjMatches } from '../../utils';

export const productSupplierSchema = object().shape({
  name: string().notRequired(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).notRequired(),
  unityValue: number().notRequired(),
});
