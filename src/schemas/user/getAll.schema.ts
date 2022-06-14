import * as yup from 'yup';

export const getAllSeralized = yup.array().of(
  yup
    .object()
    .shape({
      userId: yup.string().uuid().required(),
      name: yup.string().required(),
      email: yup.string().email().required(),
      address: yup
        .array()
        .of(
          yup.object().shape({
            addressId: yup.string().uuid().required(),
            state: yup.string().required(),
            city: yup.string().required(),
            district: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.string().required(),
            zipCode: yup.string().required(),
            isMain: yup.boolean().required(),
          })
        )
        .optional(),
    })
    .required()
);
