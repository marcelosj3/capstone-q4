import { boolean, number, object, string } from 'yup';

export const serializedAddressSchema = object().shape({
  addressId: string().uuid(),
  state: string(),
  city: string(),
  district: string(),
  street: string(),
  houseNumber: number(),
  zipCode: string(),
  additionalAddressData: string().notRequired(),
  isMain: boolean(),
});
