var expect = require("chai").expect;
var request = require("request");
var url = "http://localhost:3000/";

describe("Page access test", function() {

  describe("Fetching home page", function() {
    it("Home page", function() {
	    url = url+ "home";
    	it("returns status 200", function() {
      		request(url, function(error, response, body) {
        		expect(response.statusCode).to.equal(200);
      		});
    	});
    });});

    describe("Fetching about page", function() {
    it("About page", function() {
        url = url+ "about";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                });
        });
    });});

    describe("Fetching contact page", function() {
    it("Contact page", function() {
        url = url+ "contact";
        it("returns status 200", function() {
                request(url, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                });
        });
    });});

    describe("Authentification", function(){
        it('Should login', function(done){
            url = url+"registration";
            it('returns status 200', function(){
                request
                    .post(url)
                    .field('email', "je.bojko@gmail.com")
                    .field('password', "admin")
                    .end(function(err, res, body){
                        expect(response.statusCode).to.equal(200);
                    })
            })
        })

    });

  });

