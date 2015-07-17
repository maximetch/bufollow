var express = require('express');
var app = express();

app.get('/locations', function(request, response) {
  response.json(['Caspiana', 'Indigo', 'Paradise']);
});

app.listen(3001, function() {
  console.log('Running Express');
});