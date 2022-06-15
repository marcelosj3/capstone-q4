class BcryptMock {
  repoPath = require('bcrypt');

  compare = jest.spyOn(this.repoPath, 'compare');
}

export default new BcryptMock();
