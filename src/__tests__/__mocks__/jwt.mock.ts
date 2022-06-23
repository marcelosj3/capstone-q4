class JWTMock {
  repoPath = require('jsonwebtoken');

  decode = jest.spyOn(this.repoPath, 'decode');
  sign = jest.spyOn(this.repoPath, 'sign');
  verify = jest.spyOn(this.repoPath, 'verify');
}

export default new JWTMock();
