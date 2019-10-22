//******************************************************** Global var/const ********************************************************

document.oncontextmenu = new Function("return false"); // Block the right-click menu
var board=[];// Plateau contenant les éléments de jeu
//(-1 : bombe)(0 : case vide)(x>0 : case proche de x bombes)
var boardVisible=[];// Plateau visible
//(0 : case cachée)(1 : case contenant un numéro ou vide)(2 : case drapeau)(3 : case point d'interrogation)
var boardHtml;
var gamediv = document.querySelector("#gamedivD");// Ecran de jeu
const ratio = 0.15;// Ratio de bombes/cases
const size;
var bombs;// Nombre de bombes



//********************************************************** Get function **********************************************************

function getInitGame(x,y){
  return initGame(x,y)
}

function getInitClickListeners(){
  return initClickListeners();
}

function getPlayOnCell(x,y){
  /*void -> function*/
  return function(){playOnCell(x,y);};
}

function getDefCell(x,y){
  return function(){return defCell(x,y);};
}

//********************************************************** Init function *************************************************************

function initGame(x,y){
  var bombs = Math.round(size*size*ratio);
  // Mise en place du plateau et du plateau visible par l'utilisateur
  do{
    for(var i=0;i<size;i++){
      board[i]=[];
      boardVisible[i]=[];
      for(var j=0;j<size;j++){
        boardVisible[i][j]=0;
        if( Math.random() < ratio && ( (i < x-1 || i > x+1) && (j < y-1 || j > +1)) ){
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
      if( board[i][j] != (-1) ){
        detectionBomb(i,j,size);
      }
    }
  }
}

// Initialise le plateau de jeu en HTMl
function initInnerHTML() {
  /*HTMLElement * int -> HTMLElement[]
    creates cells to an empty <table>*/
  var innerhtml='';
  for (var i=0; i<size; i++) {
    innerhtml += "<tr class=\'ligne\'>";
    for (var j=0; j<size; j++) {
      innerhtml += "<th class=\'cell\'>";
      //innerhtml += board[i][j];
      innerhtml +="</th>";
    }
    innerhtml += "</tr>";
  }
  gamediv.innerHTML = innerhtml;
  boardHtml = document.querySelectorAll("tr.ligne");
}

function initClickListeners(){
  /*HTMLElement[] -> void
  creates cells' click cells*/
  var cell;
  for (var i=0; i<boardHtml.length; i++) {
    cell = boardHtml[i].childNodes;
    for(var j=0; j<cell.length;j++){
      //Remove listeners to create the board
      cell[j].removeEventListener("click",initClickListeners());
      cell[j].removeEventListener("click",getInitGame());
      //Create listeners to play
      cell[j].addEventListener("click",getPlayOnCell(i,j));
      cell[j].addEventListener("contextmenu",getDefCell(i,j));
    }
  }
}

function initCreateBoard(){
  /*HTMLElement[] -> void
  creates cells' click cells*/
  var cell;
  for (var i=0; i<boardHtml.length; i++) {
    cell = boardHtml[i].childNodes;
    for(var j=0; j<cell.length;j++){
      cell[j].addEventListener("click",getInitClickListeners());
      cell[j].addEventListener("click",getInitGame(i,j));
    }
  }
}

function Init(s) {
  size = s;
  /*int -> HTMLElement[]*/
  initInnerHTML();                      // Create the HTML board
  initCreateBoard();                    // Listener to start the game (first click init the game)
}

//************************************************************* Functions ****************************************************************

// Compte le nombre de bombes sur les cases adjacentes à la case (x,y)
function detectionBomb(x,y,size){
  var nbBomb=0;
  // Comptage du nombre de bombes sur cases adjacentes
  for(var i=x-1;i<=x+1;i++){
    for(var j=y-1;j<=y+1;j++){
      if( (i >= 0 && i < size) && (j >= 0 && j < size) && (board[i][j] == -1)){
        nbBomb++;
      }
    }
  }
  board[x][y]=nbBomb;
}

function playOnCell(x,y){
  if(boardVisible[x][y]==0){
    switch (board[x][y]){
      case -1 :
        boardHtml[x].childNodes[y].setAttribute("id","theOne");
        lost();
        return;
      case 0 :
        caseVide(x,y);
        break;
      default :
        boardVisible[x][y]=1;
        boardHtml[x].childNodes[y].innerText = board[x][y];
        boardHtml[x].childNodes[y].setAttribute("id","visible");
    }
  }
  win();
}

function defCell(x,y){
  switch(boardVisible[x][y]){
    case 0 :
      boardVisible[x][y]=2;
      boardHtml[x].childNodes[y].setAttribute("id","flag");
      break;
    case 2 :
      boardVisible[x][y]=3;
      boardHtml[x].childNodes[y].setAttribute("id","questionMark");
      break;
    case 3 :
      boardVisible[x][y]=0;
      boardHtml[x].childNodes[y].setAttribute("id","");
      break;
  }
}

// Dévoile les cases adjacentes à la case vide (x,y)
function caseVide(x,y){
  boardHtml[x].childNodes[y].setAttribute("id","visible");
  var limit = board.length;
  for(var i = x-1 ; i <= x+1; i++){
    for(var j = y-1; j <= y+1; j++){
        if( (i >= 0 && i < limit) && (j >= 0 && j < limit) && (boardVisible[i][j] != 1) ){
          boardVisible[i][j]=1;
          boardHtml[i].childNodes[j].setAttribute("id","visible");
          switch(board[i][j]){
            case 0 :
              caseVide(i,j);
              break;
            default :
              boardHtml[i].childNodes[j].innerText = board[i][j];
        }
      }
    }
  }
}

function lost(){
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[i].length;j++){
     if(board[i][j]==-1){
      boardHtml[i].childNodes[j].setAttribute("id","bomb");// Affiche toutes les bombes
     }
     boardVisible[i][j]=1; // Empêche de continuer à jouer
    }
  }
  gamediv.setAttribute("id","loose");
}

function win(){
  for(var i=0;i<boardVisible.length;i++){
    for(var j=0;j<boardVisible[i].length;j++){
      if(boardVisible[i][j]==0 && board[i][j]!=-1){
        return ;
      }
    }
  }
  for(var i=0;i<boardVisible.length;i++){
    for(var j=0;j<boardVisible[i].length;j++){
      boardVisible[i][j]==1;// Bloque le plateau
    }
  }
  gamediv.setAttribute("id","win");
}

//************************************************************** Start game **************************************************************

Init(10);
