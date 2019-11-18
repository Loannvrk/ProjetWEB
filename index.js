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
    script: '',
    rules: '<p>This is the homepage of this website, not much to see here</p>'
  }
  res.render("homepage.hbs",data);
});

app.get('/demineur', function (req, res) {
  let data = {
    title: 'Demineur',
    css: './css/demineur.css',
    script: './javascript/demineur.js',
    rules: '<p>Le but est de découvrir toutes les cases libres sans faire exploser les mines <br> Clic gauche = <div class="rules" ></div> -> <div class="rules visible"></div> <br> Clic droit = <svg class="far fa-flag" id="flag" ></svg>/<span id="mark">?</span> <br> Le chiffre sur une case libérée indique le nombre de mines sur les cases adjacentes <br> Le<span class="counter"> compteur</span> indique le nombre de mines restantes <br>Le <span class="timer">timer</span> indique le temps</p>'
  }
  res.render("demineur.hbs",data);
});

app.get('/glisseur', function (req, res) {
  let data = {
    title: 'Glisseur',
    css: './css/glisseur.css',
    script: './javascript/glisseur.js',
    rules: '<p>Atteindre une case verte. <br> Jouer avec les flèches du clavier.</p>'
  }
  res.render("glisseur.hbs",data);
});

app.get('/faraan', function (req, res) {
  let data = {
    title: 'faraan',
    css: './css/faraan.css',
    script: './javascript/faraan.js',
    rules: '<p>empty</p>'
  }
  res.render("faraan.hbs",data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
