import { object, string } from 'yup';

export const loginUserSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});
