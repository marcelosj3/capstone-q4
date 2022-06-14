import { boolean, object, string } from 'yup';

import { zipCodeMatches } from '../../utils';

export const createAddressSchema = object().shape({
  state: string().required(),
  city: string().required(),
  district: string().required(),
  street: string().required(),
  houseNumber: string().required(),
  zipCode: string()
    .matches(zipCodeMatches.regex, zipCodeMatches.message)
    .required(),
  additionalAddressData: string().notRequired(),
  isMain: boolean().default(false).optional(),
});
