var express = require('express'),
    PORT    = process.env.PORT || 5432,
    server  = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME = "please_change_this",
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    ejs = require('ejs');
    // expressLayouts = require('express-ejs-layouts'),
    // Schema = mongoose.Schema;

// var topicSchema = new Schema ({
//   title: String,
//   author: String,
//   body: String,
//   comments: [{ content: String}]
// });
//


// var User = mongoose.model('user', userSchema);
// var Topic = mongoose.model('topic', topicSchema);

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

server.use(function (req, res, next) {
  console.log("---------=== [REQ START] ===---------");
  console.log("REQ DOT BODY\n", req.body);
  console.log("REQ DOT PARAMS\n", req.params);
  console.log("REQ DOT SESSION\n", req.session);
  console.log("---------=== [REQ END] ===---------");
  next();
});

var userController = require('./controllers/users.js');
server.use('/users', userController);

server.use(function (req, res, next) {
  res.send("Your journey ends here");
  res.end();
});

// server.get('/test', function (req, res) {
//   res.write("Welcome to my amazing app");
//   res.end();
// });

// server.get('/new', function (req, res) {
//   res.render('users/new-user');
// });



mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function () {
  console.log("SERVER IS UP ON PORT:", PORT);
});

// ** From the login videos **
// var db = mongoose.connection;
//
// db.on('error', function () {
//   console.log("Database errors!");
// });
//
// db.once('open', function () {
//   console.log("Database up and running");
//   server.listen(3000, function () {
//     console.log("Server up and running");
//   });
// });
