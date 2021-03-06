const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use('/highscore',require('./server/highscoreRequest.js'));

app.use('/submit',require('./server/submitRequest.js'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  let data = {
    title: 'Homepage',
    css: './css/shared.css',
    rules: 'Double click sur votre pseudo pour logout',
    highscore: "highscore.hbs",
  }
  res.render("homepage.hbs",data);
});

app.get('/',function(req,res){
  let data = {
    first: '',
    second: '',
    third: '',
  }
  res.render("highscore.hbs",data);
});

app.get('/demineur', function (req, res) {
  let data = {
    title: 'Demineur',
    css: './css/demineur.css',
    rules: '<br> Le but est de découvrir toutes les cases libres sans faire exploser les mines <br> <br>'+
    '<div> <img class="items" src="./images/leftClic.svg"/> = <div class="rules" ></div> -> <div class="visible rules"></div> </div> <br>'+
    '<div> <img class="items" src="./images/rightClic.svg"/> = <img class="items" src="./images/flag.svg" id="flag" />/<span id="mark">?</span> </div> <br>'+
    ' Le chiffre sur une case libérée indique le nombre de mines sur les cases adjacentes <br> <br>'+
    '<div> Le <span style="color: red;font-weight: bold;">compteur</span> indique le nombre de mines restantes </div> <br>'+
    '<div> Le <span style="color: blue;font-weight: bold;">timer</span> indique le temps </div>',
    script: 'demineur.js'
  }
  res.render("demineur.hbs",data);
});

app.get('/glisseur', function (req, res) {
  let data = {
    title: 'Glisseur',
    css: './css/glisseur.css',
    rules: 'Atteindre une case verte. <br> Jouer avec les flèches du clavier.',
    script: 'glisseur.js'
  }
  res.render("glisseur.hbs",data);
});

app.get('/2048', function (req, res) {
  let data = {
    title: '2048',
    css: './css/2048.css',
    rules: '<p id=\'rules\'>Failed to load the rules</p>',
    script: '2048.js'
  }
  res.render("2048.hbs",data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
});


app.listen(3000, function () {
  console.log('listening on port 3000');
});
