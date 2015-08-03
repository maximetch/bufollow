var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');
var md5 = require('./md5');

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
// Sign
// -----------------------------
app.post('/api/signup', function(req, res) {
  var userInfo = req.body;

  if (!req.body.username || !req.body.email || !req.body.password) {
    res.send({
        status: 'error',
        statusMessage: 'Some fields are empty'
      });
  } else {
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
          password: md5(req.body.password),
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
  }
});

app.post('/api/signin', function(req, res) {
  console.log(req.body)
  User.find({
    password: req.body.password ? md5(req.body.password) : undefined,
    username: req.body.name
  }, function (err, user) {
    if (user.length === 0) {
      res.send({
        status: 'error',
        statusMessage: 'User not found'
      });
    } else {
      res.send({
        status: 'OK',
        statusMessage: 'User find'
      });
    }
  });
});

// -----------------------------
// Users
// -----------------------------
app.get('/api/users', function(req, res) {
  User.find({}, function (err, users) {
    res.send(users);
  });
});

// -----------------------------
// TMP
// -----------------------------
app.get('/api/clear', function(req, res) {
  var User = require('./models/user');
  User.collection.remove();

  res.send('Cleared');
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
http.createServer(app).listen(app.get('port'), function (err) {
  console.log('Express server listening on port ' + app.get('port'));
});