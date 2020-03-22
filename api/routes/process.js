var express = require('express');
var router = express.Router();

/* POST process */
router.post('/', function(req, res, next) {
  res.send('respond with phrases');
});

module.exports = router;
