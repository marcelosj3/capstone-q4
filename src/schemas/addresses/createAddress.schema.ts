import { boolean, number, object, string } from 'yup';

import { zipCodeMatches } from '../../utils';

export const createAddressSchema = object().shape({
  // TODO remove all these default values
  state: string().default('aaa').optional(),
  city: string().default('aaa').optional(),
  district: string().default('aaa').optional(),
  street: string().default('aaa').optional(),
  houseNumber: number().positive().default(1).optional(),
  zipCode: string()
    .matches(zipCodeMatches.regex, zipCodeMatches.message)
    .default('12345-123')
    .optional(),
  additionalAddressData: string().default('').optional(),
  isMain: boolean().default(false).optional(),
});
