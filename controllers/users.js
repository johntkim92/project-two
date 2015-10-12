var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js');

// define routes for router
router.get('/new', function (req, res) {
  res.render('users/new');
});


module.exports = router;
