var expect = require("chai").expect;
var should = require('chai').should();
var request = require('supertest');
var url = "http://localhost:3000/";
var app = require('../app.js');
var chai = require('chai');
var supertest = require("supertest")(app);


it("Home - Responds w status 200 & 'Welcome'", function(done) {
   supertest
    .get("/home")
    .expect(200)
    .expect(/Welcome to Admin*/)
    .expect(/Sign in*/)
    .end(done);
});
it("About - Responds w status 200 & 'About Page'", function(done) {
   supertest
    .get("/about")
    .expect(200)
    .expect(/About Page*/)
    .end(done);
});
it("Contact - Responds w status 200 & 'Contact Page'", function(done) {
   supertest
    .get("/contact")
    .expect(200)
    .expect(/Contact Page*/)
    .end(done);
});
it("Login - Responds w status 200 & 'Please log in'", function(done) {
   supertest
    .get("/login")
    .expect(200)
    .expect(/Please log in*/)
    .end(done);
});
  
describe("Authentification", function() {
    it("Login WITHOUT password - w/ CHAI HTTP", function() {
      var chaiHttp = require('chai-http');
      chai.use(chaiHttp);
      chai.request(app)
          .post('/login')
          .send({email: 'admin@admin.com', passsword: '1'})
          .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
          });
    });
    it("Sign in", function() {
        url = url+ "registration";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                    send({company_name:'efrei',
                        firstname: 'Trou',
                        lastname: 'DBall',
                        email: 'ass@be.con',
                        passsword: '123',
                        passsword_confirm: '1234'
                        })
                    expect(response.statusCode).to.equal(200);
                });
        });
    });
  it("Sign Up", function(done) {
     supertest
      .get("/registration")
      .expect(200)
      .expect(/Registration*/)
      .send({company_name:'efrei',
                        firstname: 'Trou',
                        lastname: 'DBall',
                        email: 'ass@be.con',
                        passsword: '124',
                        passsword_confirm: '1234'})
      .end(done);
  });

});


