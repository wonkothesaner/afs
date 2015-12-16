'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _userModel = require('./user.model');

var _userModel2 = _interopRequireDefault(_userModel);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

describe('User API:', function () {
  var user;

  // Clear users before testing
  before(function () {
    return _userModel2['default'].removeAsync().then(function () {
      user = new _userModel2['default']({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  // Clear users after testing
  after(function () {
    return _userModel2['default'].removeAsync();
  });

  describe('GET /api/users/me', function () {
    var token;

    before(function (done) {
      (0, _supertest2['default'])(_2['default']).post('/auth/local').send({
        email: 'test@example.com',
        password: 'password'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        token = res.body.token;
        done();
      });
    });

    it('should respond with a user profile when authenticated', function (done) {
      (0, _supertest2['default'])(_2['default']).get('/api/users/me').set('authorization', 'Bearer ' + token).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        res.body._id.toString().should.equal(user._id.toString());
        done();
      });
    });

    it('should respond with a 401 when not authenticated', function (done) {
      (0, _supertest2['default'])(_2['default']).get('/api/users/me').expect(401).end(done);
    });
  });
});
//# sourceMappingURL=user.integration.js.map
