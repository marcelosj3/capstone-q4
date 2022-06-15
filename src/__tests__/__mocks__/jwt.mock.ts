class JWTMock {
  repoPath = require('jsonwebtoken');

  sign = jest.spyOn(this.repoPath, 'sign');
}

export default new JWTMock();
