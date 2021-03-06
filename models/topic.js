var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var topicSchema = new Schema({
  title: { type: String, required: true},
  author: String,
  body: String,
  comments: [ {
    content: String,
    user: String
  } ],
  date: { type: Date, default: Date.now },
  votes: { type: Number, default: 0},
  delete: { type: Number, default: 0}
});

var Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
//
// comments: [{content: String,
//             user: String}]
