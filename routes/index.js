var express = require('express');
var router = express.Router();

var assignments = [{
  number: "1",
  name: "Brendan",
  score: 100,
  date: "Dec 1st"
},
  {
    number: "2",
    name: "Allan",
    score: 100,
    date: "Dec 2nd"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { assignments: assignments});
});

module.exports = router;
