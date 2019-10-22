//******************************************************** Global var/const ********************************************************

document.oncontextmenu = new Function("return false"); // Block the right-click menu
var board=[];// Plateau contenant les éléments de jeu
//(-1 : bombe)(0 : case vide)(x>0 : case proche de x bombes)
var htmlBoard;
var gamediv = document.querySelector(".gamedivD");// Ecran de jeu
const ratio = 0.2;// Ratio de bombes/cases
var size;
var bombs;// Nombre de bombes
var firstClick;
//********************************************************** Handler function **********************************************************

function playOnCellHandler(x,y){
  /*void -> function*/
  return ()=>{playOnCell(x,y);};
}

function defCellHandler(x,y){
  /*void -> function*/
  return ()=>{return defCell(x,y);};
}

//********************************************************** Init function *************************************************************

function initGame(x,y){
  var bombs = Math.round(size*size*ratio);
  // Mise en place du plateau et du plateau visible par l'utilisateur
  do{
    for(var i=0;i<size;i++){
      if(firstClick){
        board[i]=[];
      }
      for(var j=0;j<size;j++){
        if(Math.random() < ratio && bombs>0 && ( (i<x-1 || i>x+1) || (j<y-1 || j>y+1) )){
          board[i][j]=-1;
          bombs--;
        }
        else if(firstClick){
          board[i][j]=0;
        }
      }
    }
    firstClick = false;
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
  htmlBoard = document.querySelectorAll("tr.ligne");
}

function initClickListeners(){
  var cell;
  for (var i=0; i<htmlBoard.length; i++) {
    cell = htmlBoard[i].childNodes;
    for(var j=0; j<cell.length;j++){
      //Create listeners to play
      cell[j].addEventListener("click",playOnCellHandler(i,j));
      cell[j].addEventListener("contextmenu",defCellHandler(i,j));
    }
  }
}

function Init(s) {
  size = s;
  firstClick=true;
  /*int -> HTMLElement[]*/
  initInnerHTML();                      // Create the HTML board
  initClickListeners();                    // Listener to start the game (first click init the game)
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
  if(firstClick){
    initGame(x,y);
  }
  if(htmlBoard[x].childNodes[y].getAttribute("id")!="flag" || htmlBoard[x].childNodes[y].getAttribute("id")!="questionMark" || htmlBoard[x].childNodes[y].getAttribute("id")!="bloque"){
    switch (board[x][y]){
      case -1 :
        htmlBoard[x].childNodes[y].setAttribute("id","theOne");
        lost();
        return;
      case 0 :
        caseVide(x,y);
        break;
      default :
        htmlBoard[x].childNodes[y].innerText = board[x][y];
        htmlBoard[x].childNodes[y].setAttribute("id","visible");
    }
    win();
  }
}

function defCell(x,y){
  switch(htmlBoard[x].childNodes[y].getAttribute("id")){
    case null :
      htmlBoard[x].childNodes[y].setAttribute("id","flag");
      break;
    case "" :
      htmlBoard[x].childNodes[y].setAttribute("id","flag");
      break;
    case "flag" :
      htmlBoard[x].childNodes[y].setAttribute("id","questionMark");
      break;
    case "questionMark" :
      htmlBoard[x].childNodes[y].setAttribute("id","");
      break;
  }
}

// Dévoile les cases adjacentes à la case vide (x,y)
function caseVide(x,y){
  htmlBoard[x].childNodes[y].setAttribute("id","visible");
  var limit = board.length;
  for(var i = x-1 ; i <= x+1; i++){
    for(var j = y-1; j <= y+1; j++){
        if( (i >= 0 && i < limit) && (j >= 0 && j < limit) && (htmlBoard[i].childNodes[j].getAttribute("id") != "visible") ){
          htmlBoard[i].childNodes[j].setAttribute("id","visible");
          switch(board[i][j]){
            case 0 :
              caseVide(i,j);
              break;
            default :
              htmlBoard[i].childNodes[j].innerText = board[i][j];
        }
      }
    }
  }
}

function lost(){
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[i].length;j++){
      if(htmlBoard[i].childNodes[j].getAttribute("id")!="visible")
        htmlBoard[i].childNodes[j].setAttribute("id","bloque"); // Empêche de continuer à jouer
      if(board[i][j]==-1)
        htmlBoard[i].childNodes[j].setAttribute("id","bomb");// Affiche toutes les bombes
    }
  }
  gamediv.setAttribute("id","loose");
}

function win(){
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      if(htmlBoard[i].childNodes[j].getAttribute("id")==null && board[i][j]!=-1){
        return ;
      }
    }
  }
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      htmlBoard[i].childNodes[j].getAttribute("id")=="visible";// Bloque le plateau
    }
  }
  gamediv.setAttribute("id","win");
}

//************************************************************** Start game **************************************************************

Init(11);
