import { AnySchema } from 'yup';

class YupMock {
  repoPath = require('yup');

  validate = (shape: AnySchema) => jest.spyOn(shape, 'validate');
}

export default new YupMock();
