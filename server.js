var express = require('express');
var request = require('request');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    res.render('index.ejs');

});

app.get('/movies/:id', function (req, res) {
  request(host + req.params.id, function (error, response, body) {
    var data = JSON.parse(body);
    res.render('detail.ejs', {movie: data});
  });
});

var server = app.listen(3000, function () {
   console.log('server is running on port 3000');
});
