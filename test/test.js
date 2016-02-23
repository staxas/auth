var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var config = require('../config');
var app = require('../app.js');

chai.use(chaiHttp);

  var token;
  describe('#server', function() {
    describe('API endpoint', function() {
      describe('user request', function() {
          describe('POST /api/user/register', function() {
              it('should connect, create user, and return user database ID', function(done) {
                chai.request('http://localhost:8000')
                  .post('/api/user/register')
                  .send({
                    email: "test@test.com",
                    password: "pass123"
                  })
                  .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    // console.log(res);
                    // expect(res.body).to.have.length(24);
                    done();
                  });
              });
            }) // end POST /api/user/register/
            describe('POST /api/user/login', function() {
                it('should connect, login user, and return token', function(done) {
                  chai.request('http://localhost:8000')
                    .post('/api/user/login')
                    .send({
                      email: "test@test.com",
                      password: "pass123"
                    })
                    .end(function(err, res) {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body.token).to.not.be.empty;
                      token = res.body.token;
                      done();
                    });
                });
              }) // end POST /api/user/register/
              describe('GET /api/token/validate', function() {
                it('should connect and validate token', function(done) {
                  chai.request('http://localhost:8000')
                    .get('/api/token/validate?token=' + token)
                    .end(function(err, res) {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      // console.log(res);
                      expect(res.body.validated).to.equal('true');
                      done();
                    });
                });
              }) // end GET /api/token/validate
              describe('GET /api/token/decode', function() {
                it('should connect and decode token', function(done) {
                  chai.request('http://localhost:8000')
                    .get('/api/token/decode?token=' + token)
                    .end(function(err, res) {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body).to.not.be.empty;
                      done();
                    });
                });
              }) // end GET /api/token/validate
              describe('DELETE /api/user', function() {
                  it('should connect, and delete user', function(done) {
                    chai.request('http://localhost:8000')
                      .delete('/api/user?token=' + token)
                      .end(function(err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        // console.log(res);
                        // expect(res.body).to.have.length(24);
                        done();
                      });
                  });
                }) // end POST /api/user/register/
        }) // end User requests
    })
  })
