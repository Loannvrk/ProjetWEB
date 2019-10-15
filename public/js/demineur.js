var board;// Plateau
var visibleBoard;// Plateau visible
//(0 : case cachée)(1 : case contenant un numéro)(2 : case vide)(3 : case drapeau)(4 : case point d'interrogation)
var htmlBoard;
var gamediv = document.querySelector("#gamediv");
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

function initInnerHTML(size) {
  /*HTMLElement * int -> HTMLElement[]
    creates cells to an empty <table>*/
  var innerhtml='';
  for (var i=0; i<size; i++) {
    innerhtml += "<tr>";
    for (var j=0; j<size; j++) {
      innerhtml += "<th id=\"cell\"></th>";
    }
    innerhtml += "</tr>";
  }
  gamediv.innerHTML = innerhtml;
}

htmlBoard = document.querySelectorAll("tr");

function initClickListeners(){
  /*HTMLElement[] -> void
  creates cells' click cells*/
  var cell;
  for (var i=0; i<htmlBoard.length; i++) {
    cell = htmlBoard[i].childNodes;
    for(var j=0; i<cell.length;j++){
      cell[j].addEventListener("click",getPlayOnCell(i,j));
    }
  }
}

function getPlayOnCell(x,y){
  /*void -> function*/
  return function(event){playOnCell(x,y,event.button);};
}

function playOnCell(x,y,button){
  if(button==0 && visibleBoard[x][y]==0){
    switch (board[x][y]){
      case -1 :
        htmlBoard[x].childNodes[y].setAttribute("id","theOne");
        lost();
        break;
      case 0 :

        break;
      default :
        visibleBoard[x][y]=1;
        htmlBoard[x].childNodes[y].innerText(board[x][y]);
        htmlBoard[x].childNodes[y].setAttribute("id",board[x][y].toString(10));
    }
  }
  else if(button==2){
    switch(visibleBoard[x][y]){
      case 0 :
        visibleBoard[x][y]==3;
        htmlBoard[x].childNodes[y].setAttribute("id","flag");
        break;
      case 3 :
        visibleBoard[x][y]==4;
        htmlBoard[x].childNodes[y].setAttribute("id","questionMark");
        break;
      case 4 :
        visibleBoard[x][y]=0;
        htmlBoard[x].childNodes[y].setAttribute("id","");
        break;
    }
  }
}

function lost(){
  for(var i=0;i<htmlBoard.length;i++){
    for(var j=0;j<cell.length;j++){
     if(board[i][j]==-1){
      htmlBoard[i].childNodes[j].setAttribute("class","bomb");// Affiche toutes les bombes
     }
     visibleBoard[i][j]=2; // Empêche de continuer à jouer
    }
  }
}

function Init(size) {
  /*int -> HTMLElement[]*/
  initInnerHTML(size);                      // créer le tableau aléatoire
  initClickListeners();                      // rendre les cellules du tableau clickables
  initGame(size);                               // créer les tableaux de jeux
  return tab;
}
