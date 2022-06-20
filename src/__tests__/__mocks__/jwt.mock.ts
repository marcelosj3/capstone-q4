class JWTMock {
  repoPath = require('jsonwebtoken');

  sign = jest.spyOn(this.repoPath, 'sign');
  verify = jest.spyOn(this.repoPath, 'verify');
  decode = jest.spyOn(this.repoPath, 'decode');
}

export default new JWTMock();
