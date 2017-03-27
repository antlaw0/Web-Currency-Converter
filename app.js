var express = require('express');
var exp_hbs = require('express-handlebars');
var path = require('path');

//copied following from astropics app
/*
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
*/
var routes = require('./routes/index');
var about = require('./routes/about');

var app = express();

app.engine('.hbs', exp_hbs({
  extname:'.hbs',
  defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'static')));

//copied following from astropics app
/*
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
*/
app.use('/', routes);
app.use('/about', about);

app.listen(process.env.PORT || 3000, function(){
  console.log('Currency app running on port 3000');
})

module.exports = app;
