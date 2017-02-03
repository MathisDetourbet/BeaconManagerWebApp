var expect = require("chai").expect;
var request = require("request");
var url = "http://localhost:3000/";

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
