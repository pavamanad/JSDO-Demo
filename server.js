var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/build/static'));

app.get('/*', function(req, res){
	res.render('index');
});

app.listen(7090);
