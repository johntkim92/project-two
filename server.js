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
  body: String,
  comments: [{ content: String}]
});

var userSchema = Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

var User = mongoose.model('user', userSchema);
var Topic = mongoose.model('topic', topicSchema);

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
  secret: "jaxwillbethelastonestanding",
  resave: true,
  saveUninitialized: false
}));

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(methodOverride('_method'));

server.get('/test', function (req, res) {
  res.write("Welcome to my amazing app");
  res.end();
});

server.get('/new', function (req, res) {
  res.render('users/new-user');
});

server.post('/', function (req, res) {
  var newUser = User(req.body.user);

  newUser.save(function (err, user) {
    res.redirect(301, "/users/" + user._id)
  });
});

server.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user);
  });
});


mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function () {
  console.log("SERVER IS UP ON PORT:", PORT);
});
