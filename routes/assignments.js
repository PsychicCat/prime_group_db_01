var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignments');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  if(req.params.id){
    Assignments.findById(req.params.id,function(err, assignment){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.json(assignment);
      }
    })
  } else {
    Assignments.find({}, function(err, assignments){
      if(err){
        console.log(err);
        next(err);
      } else {
        res.json(assignments);
      }
    })
  }

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

router.delete('/:id', function(req, res, next){
  Assignments.findByIdAndRemove(req.params.id, function(err, assignment){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.sendStatus(200);
    }
  })
});

router.put('/:id', function(req,res,next){
  console.log(req.params.id);
  console.log(req.body);
  Assignments.findByIdAndUpdate(req.params.id, req.body, function(err, assignment){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.sendStatus(200);
    }
  })
});

module.exports = router;
