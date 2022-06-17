class JWTMock {
  repoPath = require('jsonwebtoken');

  sign = jest.spyOn(this.repoPath, 'sign');
  verify = jest.spyOn(this.repoPath, 'verify');
}

export default new JWTMock();
