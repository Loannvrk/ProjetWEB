function initInnerHTML() {
  /*void -> HTMLelement[]
    creates an empty table in <table id=#game2048>*/
  var innerhtml = '<tbody>';
  for (var i=0 ; i <4; i++) {
    innerhtml += '<tr>'
    for (var j=0; j<4; j++) {
      innerhtml += '<th class=\'cell empty\'></th>'
    }
    innerhtml += '</tr>'
  }
  innerhtml += '</tbody>'
  document.getElementById('game2048').innerHTML = innerhtml;
}
function writeRules(txt) {
  /*str -> void*/
  document.getElementById('rules').textContent = txt;
  return document.querySelectorAll('.cell');
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function left(){
  //TODO
}
function up(){
  //TODO
}
function right(){
  //TODO
}
function down(){
  //TODO
}
function  addNumber(){
  var tab = document.querySelectorAll('.empty');
  var cell = tab[getRandomInt(tab.length)];
  if (cell == undefined) {
    gameOver('stuck');
  }else {
    var n = getRandomInt(2);
    n = n*2+2;
    cell.textContent = n;
    cell.className = 'cell cell'+n;
  }
  //TODO
}
function gameOver(reason){
  //TODO
  if (reason == 'stuck') {
    alert("vous êtes coincé, vous avez perdu");
  }
}
function play(keycode){
  //TODO stop when games stop (variable global bool ?)
  if (keycode == 37) {
    left();
  }else if(keycode == 38){
    up();
  }else if (keycode == 39) {
    right();
  }else if (keycode == 40) {
    down();
  }else {
    return;
  }
  addNumber();
}

function getPlay() {
  return function(event){play(event.keyCode);}
}

function initKeyboardListener() {
  /*void -> void
    creates keyboard input callback*/
  window.addEventListener("keydown",getPlay(),true);
}
//main
var rules = "Le but du jeu est de faire glisser des tuiles sur la grille, pour combiner les tuiles de mêmes valeurs et créer ainsi une tuile portant le nombre 2048. Vous pouvez toutefois continuer à jouer après cet objectif atteint pour faire le meilleur score possible."
writeRules(rules);
initInnerHTML();
initKeyboardListener();
addNumber();
addNumber();
