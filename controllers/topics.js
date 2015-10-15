var express = require('express'),
    router = express.Router(),
    Topic = require('../models/topic.js'),
    User = require('../models/user.js');

router.get('/', function (req, res) {
  // console.log(req.body.user.username);
  Topic.find({}, function (err, allTheTopics) {
    if (err) {
      console.log("Something broke", err);
    } else {
      res.render('topics/index', {
        topics : allTheTopics
      });
    }
  });
});

router.get('/new', function (req, res) {
  res.render('topics/new');
});

router.get('/:id', function (req, res) {
  Topic.findById(req.params.id, function (err, aSpecficTopic) {
    if (err) {
      console.log("Something broke", err);
    } else {
      res.render('topics/show', {
        topic: aSpecficTopic
      });
    }
  });
});



// ** getting the comments to render back onto the page **
// router.post('/:id', function (req, res) {
//   var newTopic = Topic(req.body.topic);
//   newTopic.save(function (err, topic) {
//     res.redirect(301, "/topics/" + topic._id);
//   });
// });

router.get('/:id/edit', function (req, res) {
  Topic.findById(req.params.id, function (err, aSpecficTopic) {
    if (err) {
      console.log("Something broke", err);
    } else {
      res.render('topics/edit', {
        topic: aSpecficTopic
      });
    }
  });
});



router.patch('/:id', function (req, res) {
  var topicOptions = req.body.topic;
  // var topicOptions = {$inc: { votes: req.body.topic.votes } }
  Topic.findByIdAndUpdate(req.params.id, topicOptions, function (err, updatedTopic) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, "/topics/" + updatedTopic._id);
    }
  });
});

router.patch('/:id/comments', function (req, res) {
// var addComment = {$push: {comments: req.body.topic.comments}}
var addComment = {$push: {comments: {content: req.body.topic.comments, user: req.session.currentUser}}};

  Topic.findByIdAndUpdate(req.params.id, addComment, function (err, updatedComment) {
    if (err) {
      console.log(err)
    } else {
      res.redirect(301, "/topics/" + updatedComment._id);
    }
  });
});

router.patch('/:id/upvotes', function (req, res) {
  var voteOptions = {$inc: { votes: req.body.topic.votes } };
  Topic.findByIdAndUpdate(req.params.id, voteOptions, function (err, updatedVote) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, "/topics/" + updatedVote._id);
    }
  });
});

router.patch('/:id/downvotes', function (req, res) {
  var voteOptions = {$inc: { votes: req.body.topic.votes } };
  Topic.findByIdAndUpdate(req.params.id, voteOptions, function (err, updatedVote) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, "/topics/" + updatedVote._id);
    }
  });
});

router.delete('/:id', function (req, res) {
  Topic.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("User is gone..");
      res.redirect(301, '/topics');
    }
  });
});

router.post('/', function (req, res) {
  var topicOptions = req.body.topic;
  var newTopic = new Topic(topicOptions);
  newTopic.author = req.session.currentUser;
  newTopic.save(function (err, useAfterDatabase) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, "/topics");
    }
  });
});
// ** Use this below code for post whe submitting new topic?

// var attempt = req.body.user;
//
// User.findOne({ username: attempt.username }, function (err, user) {
//   if (user && user.password === attempt.password) {
//     req.session.currentUser = user.username;
//     res.redirect(301, "/topics");
//   } else {
//     res.redirect(301, '/users/login');
//   };
// });


// ** comments.split not working **

//   var topicOptions = req.body.topic;
//   topicOptions.comments = topicOptions.comments.split(/,\s?/);
//   var newTopic = new Topic(topicOptions);
//   newTopic.save(function (err, topicAfterDatabase) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect(302, "/");
//     }
//   });
// });





module.exports = router;
