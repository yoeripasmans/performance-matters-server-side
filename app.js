// var MapboxClient = require('mapbox');
// var client = new MapboxClient('pk.eyJ1IjoieW9lcndlbGkiLCJhIjoiY2plZmViOHNlMWhhazMza3R5MmE5NG9jcyJ9.Bm8bYiLXnQ41Nv_Sio1xpA');
var express = require('express');
var controllers = require('./controllers');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', controllers);

app.listen(3000, function() {
	console.log('server is running on port 3000');
});
