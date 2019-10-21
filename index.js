const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  let data = {
    title: 'Homepage',
    css: './css/test.css',
    script: ''
  }
  res.render("homepage.hbs",data);
});

app.get('/demineur', function (req, res) {
  let data = {
    tile: 'demineur',
    css: './css/demineur.css',
    script: './javascript/demineur.js'
  }
  res.render("demineur.hbs",data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
