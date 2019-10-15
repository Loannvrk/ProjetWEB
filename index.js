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
    title: 'Homepage'
  }
  res.render("test.hbs",data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
