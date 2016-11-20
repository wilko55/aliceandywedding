var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 7000));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-partial-templates')(app));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('hogan-express-strict'));

app.get('/', function(req,res, next) {
  res.render('index')
})

app.get('/venues/name/:id', function(req,res, next) {
  var venues = JSON.parse(require('fs').readFileSync('./venues.json')).venues[req.params.id]

  res.json(venues) 
})

app.get('/venues/capacity/:num', function(req,res, next) {
  var venues = JSON.parse(require('fs').readFileSync('./venues.json'))
  var matches = {}
  for (var prop in venues.venues) {
    console.log(prop + ' - ' + venues.venues[prop].capacity)
    if (venues.venues[prop].capacity <= req.params.num) {
      matches[prop] = venues.venues[prop]
    }
  }
  res.json(matches) 
})

app.post('/churlish', function(req,res, next) {

  if (req.body.password === 'videoman'){
    res.send('yo')
  }
  else {
    res.render('churlish', {showPass: true, showVid: false})  
  }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});