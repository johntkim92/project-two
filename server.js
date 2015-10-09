var express = require('express'),
    PORT    = process.env.PORT || 5432,
    server  = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname = "please_change_this",
    mongoose = require('mongoose');

server.get('/test', function (req, res) {
  res.write("Welcome to my amazing app");
  res.end();
});

mongoose.connect(MONGOURI);
server.listen(PORT, function () {
  console.log("SERVER IS UP ON PORT:", PORT);
});
