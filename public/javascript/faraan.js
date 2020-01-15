var gameover = false;
var score = 0;
var tab;
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
var moved = false;
var maxxx;
  for (var y=0; y<4; y++) {
    maxxx = -1;
    for (var x=1; x<4; x++) {//parcours du tableau

      if (tab[x+4*y].className != 'cell empty') {//si la case n'est pas vide
        for (var xx=x-1; xx>=0; xx--) {//on regarde les cases a sa gauche
          //si la case est du même chiffre, alors on fusionne
          if (xx>maxxx && tab[x+4*y].textContent == tab[xx +4*y].textContent) {
            tab[xx +4*y].textContent = Number(tab[xx +4*y].textContent)*2;
            score += Number(tab[xx +4*y].textContent);
            tab[x+4*y].textContent = '';
            tab[x+4*y].className = 'cell empty';
            moved = true;
            maxxx = xx; //la case résultante ne peux pas être refusionée
            break;
          }
          //sinon on déplace avant la prochaine case pleine
          else if (tab[xx+4*y].textContent != '') {
            if (xx != x-1) {
              tab[xx+1 +4*y].textContent = tab[x+4*y].textContent;
              tab[xx+1 +4*y].className = "cell";
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty';
              moved = true;
            }
            break;
          }
          //sinon on déplace tout a gauche
          else if (xx == 0) {
            tab[xx+4*y].textContent = tab[x+4*y].textContent;
            tab[xx+4*y].className = "cell";
            tab[x+4*y].textContent = '';
            tab[x+4*y].className = 'cell empty';
            moved = true;
          }

        }
      }

    }
  }
return moved //si un bloc a été déplacé, true, sinon false.
}

function up(){
  //voir les commentaires de left()
  var moved = false;
  var maxyy;
  for (var x=0; x<4; x++) {
    maxyy = -1;
      for (var y=1; y<4; y++){

        if (tab[x+4*y].className != 'cell empty') {
          for (var yy=y-1; yy>=0; yy--) {

            if (yy>maxyy &&tab[x+4*y].textContent == tab[x+4*yy].textContent) {
              tab[x+4*yy].textContent = Number(tab[x+4*y].textContent)*2;
              score += Number(tab[x+4*yy].textContent);
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty';
              moved = true;
              maxyy = yy;
              break;
            }

            else if (tab[x+4*yy].textContent != ''){
              if(yy!=y-1) {
                tab[x+4*(yy+1)].textContent = tab[x+4*y].textContent;
                tab[x+4*(yy+1)].className = 'cell';
                tab[x+4*y].textContent = '';
                tab[x+4*y].className = 'cell empty'
                moved = true;
              }
              break;
            }

            else if (yy==0){
              tab[x+4*yy].textContent = tab[x+4*y].textContent;
              tab[x+4*yy].className = 'cell';
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty';
              moved = true;
            }

          }
        }

      }
  }

  return moved;
}
function right(){
  //voir les commentaires de left()
  var moved = false;
  var maxxx;

  for (var y=0; y<4; y++) {
    maxxx=4;
    for (var x=2; x>=0; x--) {

      if(tab[x+4*y].className != 'cell empty'){
        for (var xx=x+1; xx<4; xx++) {

          if (xx<maxxx && tab[xx+4*y].textContent == tab[x+4*y].textContent) {
            tab[xx +4*y].textContent = Number(tab[xx +4*y].textContent)*2;
            score += Number(tab[xx +4*y].textContent);
            tab[x+4*y].textContent = '';
            tab[x+4*y].className = 'cell empty';
            moved = true;
            maxxx = xx;
            break;
          }

          else if (tab[xx+4*y].textContent != ''){
            if(xx!=x+1) {
              tab[xx-1+4*y].textContent = tab[x+4*y].textContent;
              tab[xx-1+4*y].className = 'cell';
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty'
              moved = true;
            }
            break;
          }

          else if (xx==3){
            tab[xx+4*y].textContent = tab[x+4*y].textContent;
            tab[xx+4*y].className = 'cell';
            tab[x+4*y].textContent = '';
            tab[x+4*y].className = 'cell empty';
            moved = true;
          }

        }
      }

    }
  }

  return moved;
}
function down(){
  //voir les commentaires de left()
  var moved = false;
  var maxyy;
  for (var x=0; x<4; x++) {
    maxyy = 4;
      for (var y=2; y>=0; y--){
        if (tab[x+4*y].className != 'cell empty') {
          for (var yy=y+1; yy<4; yy++) {

            if (yy<maxyy && tab[x+4*y].textContent == tab[x+4*yy].textContent) {
              tab[x+4*yy].textContent = Number(tab[x+4*y].textContent)*2;
              score += Number(tab[x+4*yy].textContent);
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty';
              moved = true;
              maxyy = yy;
              break;
            }

            else if (tab[x+4*yy].textContent != ''){
              if(yy!=y+1) {
                tab[x+4*(yy-1)].textContent = tab[x+4*y].textContent;
                tab[x+4*(yy-1)].className = 'cell';
                tab[x+4*y].textContent = '';
                tab[x+4*y].className = 'cell empty'
                moved = true;
              }
              break;
            }

            else if (yy==3){
              tab[x+4*yy].textContent = tab[x+4*y].textContent;
              tab[x+4*yy].className = 'cell';
              tab[x+4*y].textContent = '';
              tab[x+4*y].className = 'cell empty';
              moved = true;
            }

          }
        }

      }
  }

  return moved;
}
function  addNumber(){
  var tab = document.querySelectorAll('.empty');
  var cell = tab[getRandomInt(tab.length)];
  if (cell == undefined) {
    gameOver('stuck');
  }else {
    var rand = Math.random();
    if (rand < 0.2) {
      cell.textContent = 4
    }else {
      cell.textContent = 2;
    }
    cell.className = "cell";
  }
  //TODO
}
function gameOver(reason){
  //TODO
  gameover = true;
  if (reason == 'stuck') {
    alert("vous êtes coincé, vous avez perdu\nscore : "+score);
  }
  return score;
}
function play(keycode){
  var moved = false;
  if (gameover) {
    return;
  }else if (keycode == 37) {
    moved = left();
  }else if(keycode == 38) {
    moved = up();
  }else if (keycode == 39) {
    moved = right();
  }else if (keycode == 40) {
    moved = down();
  }else {
    return;
  }
  if (moved) {
    addNumber();
    console.log(score);
  }
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
tab = document.querySelectorAll(".cell");
