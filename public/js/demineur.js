var board;// Plateau
var visibleBoard;// Plateau visible
//(0 : case cachée)(1 : case contenant un numéro)(2 : case vide)(3 : case drapeau)(4 : case point d'interrogation)
var htmlBoard;
const ratio = 0.2;
var bombs;
// Init function
function initGame(size){
  var bombs = Math.round(size*size*ratio);
  // Mise en place du plateau et du plateau visible par l'utilisateur
  do{
    for(var i=0;i<size;i++){
      for(var j=0;j<size;j++){
        visibleBoard[i][j]=0;
        if(Math.random() < ratio && bombs > 0){
          board[i][j]=-1;
          bombs--;
        }
        else{
          board[i][j]=0;
        }
      }
    }
  }while(bombs>0);
  // Détection du nombre de bombes sur les cases adjacentes
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      if(board[i][j]!=-1){
        detectionBomb(i,j,size);
      }
    }
  }
}

function detectionBomb(x,y,size){
  var counter;
  // Comptage du nombre de bombes sur cases adjacentes
  for(var i=x-1;i<x+1;i++){
    for(var j=y-1;j<y+1;j++){
      if( (i >= 0 && i < size) && (j >= 0 && j < size) && tab[i][j] == -1){
        counter++;
      }
    }
  }
  tab[i][j]=counter;
}

function initInnerHTML(tab,size) {
  /*HTMLElement * int -> HTMLElement[]
    creates cells to an empty <table>*/
  var innerhtml=''
  for (var i=0; i<size; i++) {
    innerhtml += "<tr>";
    for (var j=0; j<size; j++) {
      innerhtml += "<th id=\"cell\"></th>";
    }
    innerhtml += "</tr>";
  }
  tab.innerHTML = innerhtml;
}

htmlBoard = document.querySelectorAll("tr");

function initClickListeners(){
  /*HTMLElement[] -> void
  creates cells' click cells*/
  var cell;
  for (var i=0; i<tab.length; i++) {
    cell = htmlBoard[i].childNodes;
    for(var j=0; i<cell.length;j++){
      cell[j].addEventListener("click",getPlayOnCell(i,j));
    }
  }
}

function getPlayOnCell(x,y,){
  /*void -> function*/
  return function(event){playOnCell(x,y,event.button);};
}

function playOnCell(x,y,keycode){
  if(keycode==1 && visibleBoard[x][y]==0){

  }
  else{
    switch(visibleBoard[x][y]){
      case 0 :
        visibleBoard[x][y]==3;
        break;
      case 3 :
        visibleBoard[x][y]==4;
        break;
      case 4 :
        visibleBoard[x][y]=0;
        break;
    }
  }
}

function Init(size) {
  /*int -> HTMLElement[]*/
  var tab = document.querySelector("#gamediv"); // récupérer la zone de création du tableau
  initInnerHTML(tab,size);                      // créer le tableau aléatoire
  initClickListeners();                      // rendre les cellules du tableau clickables
  initGame(size);                               // créer les tableaux de jeux
  return tab;
}
