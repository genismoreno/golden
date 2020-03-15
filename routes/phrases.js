var express = require('express');
var router = express.Router();

/* GET phrases listing. */
router.get('/', function(req, res, next) {
  res.send('respond with phrases');
});

module.exports = router;
