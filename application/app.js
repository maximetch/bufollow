var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');

var app = module.exports = express();


// CONFIGURATION

// all environments
app.set('port', process.env.PORT || 3200);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/bufollow');
var User = require('./models/user');

// ROUTES

// -----------------------------
// serve index and view partials
// -----------------------------
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// -----------------------------
// Users
// -----------------------------
app.post('/api/users', function(req, res) {
  var userInfo = req.body;

  User.find({
    $or: [{
      'username': req.body.username
    }, {
      'email': req.body.email
    }]
  }, function(err, users) {
    if (users.length === 0) {
      new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dateCreated: Date.now()
      }).save(function() {
        res.send({
          status: 'OK',
          statusMessage: 'User created'
        });

        mongoose.connection.close();
      });
    } else {
      res.send({
        status: 'error',
        statusMessage: 'A user is already registered with this email or username'
      });
    }
  });
});

app.get('/api/users', function(req, res) {
  User.find({}, function (err, users) {
    res.send(users);
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

// Start server
http.createServer(app).listen(app.get('port'), function (err) {
  console.log('Express server listening on port ' + app.get('port'));
});