var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3200);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.post('/api/users', function(req, res) {
  mongoose.connect('mongodb://localhost/bufollow');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    var userInfo = req.body;
    var User = require('./models/user');

    User.find({
      $or: [{
        'userName': userInfo.username
      }, {
        'email': userInfo.email
      }]
    }, function(err, users) {
      console.log(users)
      if (users.length === 0) {
        new User(userInfo).save(function() {
          mongoose.connection.close();
        });
      } else {
        res.send({
          status: 'error',
          message: 'Already exists'
        });
        mongoose.connection.close();
      }
    });

  });
});

app.get('/api/users', function(req, res) {
  mongoose.connect('mongodb://localhost/bufollow');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    var User = require('./models/user');

    User.find({}, function (err, users) {
        res.send(users);

        mongoose.connection.close();
    });
  });
});

app.get('/api/clear', function(req, res) {
  mongoose.connect('mongodb://localhost/bufollow');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("CONNECTED")

    var User = require('./models/user');
    User.collection.remove();

    mongoose.connection.close();
  });
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function (err) {
  console.log('Express server listening on port ' + app.get('port'));
});