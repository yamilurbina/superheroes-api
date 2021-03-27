var express = require('express');
var router = express.Router();
var SuperheroesDao = require("../dao/SuperheroesDao");
var superheroesDao = new SuperheroesDao();

router.post('/', function(req, res, next) {
  var db = req.app.db;
  var superheroInfo = req.body;
  superheroesDao.addSuperhero(db, superheroInfo).then(success => {
    res.status(200).json({
      "status":"Success",
      "messages":"Data Saved"
    })
  }, error => {
    res.status(500).json({
      "status":"Error",
      "message":error
    })
  })
});

router.get('/', function(req, res, next) {
  var db = req.app.db;

  superheroesDao.getSuperheroes(db)
    .then(data => {
      res.status(200).json({
        "status": "Success",
        "data": data
      })
    }, error => {
      res.status(500).json({
        "status": "Error",
        "message": error
      })
    })
});

router.get('/:slug', function(req, res, next) {
  var db = req.app.db;
  var slug = req.params.slug
  superheroesDao.getSuperhero(db, slug)
    .then(data => {
      res.status(200).json({
        "status": "Success",
        "data": data
      })
    }, error => {
      res.status(500).json({
        "status": "Error",
        "message": error
      })
    })
});

router.put('/:slug', function(req, res, next) {
  var db = req.app.db;

  var slug = req.params.slug
  var superheroInfo = req.body;

  superheroesDao.updateSuperhero(db, slug, superheroInfo)
    .then(data => {
      res.status(200).json({
        "status": "Success",
        "data": data
      })
    }, error => {
      res.status(500).json({
        "status": "Error",
        "message": error
      })
    })
});

router.delete('/:slug', function(req, res, next) {
  var db = req.app.db;

  var slug = req.params.slug

  superheroesDao.removeSuperhero(db, slug)
    .then(data => {
      res.status(200).json({
        "status": "Success",
        "data": data
      })
    }, error => {
      res.status(500).json({
        "status": "Error",
        "message": error
      })
    })
});

router.delete('/', function(req, res, next) {
  var db = req.app.db;
  
  superheroesDao.removeAll(db)
    .then(data => {
      res.status(200).json({
        "status": "Success",
        "data": data
      })
    }, error => {
      res.status(500).json({
        "status": "Error",
        "message": error
      })
    })
});

module.exports = router;
