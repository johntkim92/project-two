var express = require('express'),
    PORT    = process.env.PORT || 5432,
    server  = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME = "please_change_this",
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    Schema = mongoose.Schema;

var topicSchema = new Schema ({
  title: String,
  author: String,
  comments: [{ content: String}]
});

var Topic = mongoose.model('topic', topicSchema);

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(methodOverride('_method'));

server.get('/test', function (req, res) {
  res.write("Welcome to my amazing app");
  res.end();
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function () {
  console.log("SERVER IS UP ON PORT:", PORT);
});
