import { boolean, number, object, string } from 'yup';

export const serializedCreatedAddressSchema = object().shape({
  addressId: string().uuid().required(),
  state: string().required(),
  city: string().required(),
  district: string().required(),
  street: string().required(),
  houseNumber: number().required(),
  zipCode: string().required(),
  additionalAddressData: string().notRequired(),
  isMain: boolean().required(),
});
