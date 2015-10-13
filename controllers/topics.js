var express = require('express'),
    router = express.Router(),
    Topic = require('../models/topic.js');

router.get('/', function (req, res) {
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


router.post('/', function (req, res) {
  var newTopic = Topic(req.body.topic);
  newTopic.save(function (err, topic) {
    res.redirect(301, "/topics/" + topic._id);
  });
});

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
