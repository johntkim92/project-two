var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var topicSchema = new Schema({
  title: { type: String, required: true},
  author: String,
  body: String,
  comments: [ String ]
});

var Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
