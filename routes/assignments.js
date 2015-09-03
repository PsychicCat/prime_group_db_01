var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignments');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Assignments.find({}, function(err, assignments){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.json(assignments);
    }
  })
});


router.post('/', function(req, res, next) {

  var assignment = new Assignments(req.body);

  assignment.save(function (err) {
    if (err) {
      console.log(err);
      next(err);
    }
  });
  res.send(JSON.stringify(assignment));
});

module.exports = router;
