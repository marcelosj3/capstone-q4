import { number, object, string } from 'yup';

import { cnpjMatches } from '../../utils';

export const productSupplierSchema = object().shape({
  name: string().required(),
  cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).required(),
  unityValue: number().required(),
});
