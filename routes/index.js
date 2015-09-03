var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignments');



/* GET home page. */
router.get('/', function(req, res, next) {

  Assignments.find({}, function(err, assignments) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render('index', { assignments: assignments});
    }
  });
});

module.exports = router;
