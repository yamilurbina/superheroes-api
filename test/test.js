var assert = require('assert');
let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Superheroes", function() {
  describe("DELETE ALL", function() {
    it("should remove all superheroes", done => {
      chai.request(server)
        .delete("/superheroes")
        .send({})
        .end((err,res) => {
          res.should.have.status(200);
          done()
        })
    })
  })
  
  describe("CRUD", function() {
    var superheroes = [{
      "slug": "batman",
      "name": "Batman",
      "year": 1939,
      "creator": "Bob Kane & Bill Finger"
    }]

    it("Should add superheroes to DB", (done) => {
      for (superhero in superheroes) {
        chai.request(server)
          .post("/superheroes")
          .send(superheroes[superhero])
          .end((err, res) => {
            res.should.have.status(200);
          })
      }
      done()
    })

    it("Should get one superhero", (done) => {
      chai.request(server)
        .get("/superheroes/batman")
        .end((err, result) => {
          result.should.have.status(200);
          done()
        })
    })

    it("Should update a single superhero", (done) => {
      var updateSuperhero = {
        "slug": "batman",
        "name": "Batman",
        "year": 1940,
        "author": "Bob Kane"
      }

      chai.request(server)
        .put("/superheroes/batman")
        .send(updateSuperhero)
        .end((err, result) => {
          result.should.have.status(200);
          done()
        })
    })

  })
})
