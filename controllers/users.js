var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Topic = require('../models/topic.js');

// define routes for router
router.get('/new', function (req, res) {
  res.render('users/new');
});

router.post('/new', function (req, res) {
  var newUser = User(req.body.user);
  newUser.save(function (err, user) {
    // req.session.currentUser = req.body.user.username;
    res.redirect(301, "/topics");
  });
});

router.get('/login', function (req, res) {
  res.render('users/login');
});

router.post('/login', function (req, res) {
  var attempt = req.body.user;

  User.findOne({ username: attempt.username }, function (err, user) {
    if (user) {
      if (user && user.password === attempt.password) {
        req.session.currentUser = user.username;
        res.redirect(301, "/topics");
      } else {
        res.redirect(301, '/new');
      }
    }
  });
});

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user);
  });
});

// router.get('/logout', function(req, res) {
//   console.log(req.session.currentUser);
//   delete req.session.currentUser;
//   req.session.destroy();
//
//   res.redirect(301, '/users/login');
// });


module.exports = router;
