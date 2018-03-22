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
