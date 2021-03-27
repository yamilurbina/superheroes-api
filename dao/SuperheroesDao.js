var Q = require("q");

var SuperheroesDao = function() {
  this.addSuperhero = function(db, superheroInfo) {
    var def = Q.defer();
    db.collection("superheroes").insertOne(superheroInfo).then(success => {
      def.resolve(success);
    }, error => {
      def.reject(error)
    });
    return def.promise
  }

  this.getSuperheroes = function(db) {
    var def = Q.defer();
    db.collection("superheroes").find({}).toArray()
      .then(data => {
        def.resolve(data)
      }, error => {
        def.reject(error)
      })
    return def.promise
  }

  this.getSuperhero = function(db, slug) {
    var def = Q.defer();

    db.collection("superheroes").findOne({slug:slug})
      .then(superheroInfo => {
        def.resolve(superheroInfo)
      }, error => {
        def.reject(error)
      })
    return def.promise
  }

  this.updateSuperhero = function(db, slug, superheroInfo) {
    var def = Q.defer();
    db.collection("superheroes").update({slug:slug}, superheroInfo)
      .then(success => {
        def.resolve(success);
      }, error => {
        def.reject(error);
      })
    return def.promise
  }

  this.removeSuperhero = function(db, slug) {
    var def = Q.defer();
    db.collection("superheroes").remove({slug:slug})
      .then(success => {
        def.resolve(success);
      }, error => {
        def.reject(error);
      })
    return def.promise
  }

  this.removeAll = function(db) {
    var def = Q.defer();
    db.collection("superheroes").remove({})
      .then(success => {
        def.resolve(success);
      }, error => {
        def.reject(error);
      })
    return def.promise
  }
}

module.exports = SuperheroesDao;
