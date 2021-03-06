var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var models = require('./data/models')
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

app.post('/', function(req,res, next) {

  if (req.body.attending === '' || req.body.name === '' || req.body.numberAttending === ''){
    res.render('index', {error: true})
  }
  else {
    console.log(req.body)
    models.Guest.create({
      'name': req.body.name,
      'attending': req.body.attending,
      'dietary': req.body.dietary,
      'dietaryText': req.body.dietaryText,
      'numberAttending': req.body.numberAttending,
      'song1': req.body.song1,
      'song2': req.body.song2,
    }).then(function () {
      res.render('index', {thanks: true})
    });
  }
})

app.get('/registry', function(req,res, next) {
  res.render('registry')
})

app.get('/venues/name/:id', function(req,res, next) {
  var venues = JSON.parse(require('fs').readFileSync('./venues.json')).venues[req.params.id]

  res.json(venues)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});