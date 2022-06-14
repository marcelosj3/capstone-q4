jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(jest.requireActual('uuid').v4),
}));

class UUIDMock {
  repoPath = require('uuid');

  v4 = jest.spyOn(this.repoPath, 'v4');
}

export default new UUIDMock();
