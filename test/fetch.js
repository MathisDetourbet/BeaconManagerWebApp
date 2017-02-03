var expect = require("chai").expect;
var request = require("request");
var url = "http://localhost:3000/";
var app = require('../app.js');

describe("Page access test without login", function() {
    it("Home page", function() {
	    url = url+ "home";
    	it("returns status 200", function() {
      		request(url, function(error, response, body) {
        		expect(response.statusCode).to.equal(200);
      		});
    	});
    });
    it("About page", function() {
        url = url+ "about";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                });
        });
    });
    it("Contact page", function() {
        url = url+ "contact";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                });
        });
    });
  });

describe("Page access test with login", function() {
    it("Login", function() {
	    url = url+ "login";
      var chai = require('chai');
      var chaiHttp = require('chai-http');
      chai.use(chaiHttp);
      chai.request(app)
          .put('/login')
          .send({username: 'admin@admin.com', passsword: 'efreitr'})
          .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
          });

    });
    it("Sign in", function() {
        url = url+ "registration";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                });
        });
    });

  });
