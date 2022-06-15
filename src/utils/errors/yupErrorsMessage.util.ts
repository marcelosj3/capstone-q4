/**
 *
 * Will receive an yup error incoming from a catch block
 * and create a missing keys block whenever necessary,
 * also will verify if the message needs to be an array
 * or just one object.
 *
 * @param error
 * @returns array or object containing error messages
 */
export const yupErrorsMessage = (error: any) => {
  const errors = [];

  const requiredFields = error.errors.filter((element: string | object) => {
    if (typeof element === 'string' && element.includes('required field')) {
      return element;
    } else {
      errors.push(element);
    }
  });

  if (requiredFields.length !== 0) {
    errors.push({ error: 'Missing keys', requiredFields });
  }

  const errorMessage = errors.length > 1 ? errors : errors[0];

  return errorMessage;
};
