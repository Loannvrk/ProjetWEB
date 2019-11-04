//******************************************************** Global var/const ********************************************************


var board=[];// Plateau contenant les éléments de jeu
//(-1 : bombe)(0 : case vide)(x>0 : case proche de x bombes)
var htmlBoard;
var gameTable = document.querySelector(".gameTable");// Ecran de jeu
gameTable.oncontextmenu = function(){
  return false;
} // Block the right-click menu on the game
var menu = document.querySelector(".menu");
const ratio = 0.2;// Ratio de bombes/cases
var size;
var bombs;// Nombre de bombes
var firstClick;
var cpt = document.querySelector(".counter");
var timerHTML = document.querySelector(".timer");
var timer;
var time;
//********************************************************** Handler function **********************************************************

function playOnCellHandler(x,y){
  /*void -> function*/
  return ()=>playOnCell(x,y);
}

function defCellHandler(x,y){
  /*void -> function*/
  return ()=>defCell(x,y);
}

//********************************************************** Init function *************************************************************

function initGame(x,y){
  var counter = bombs;
  // Mise en place du plateau et du plateau visible par l'utilisateur
  do{
    for(var i=0;i<size;i++){
      if(firstClick){
        board[i]=[];
      }
      for(var j=0;j<size;j++){
        if(Math.random() < ratio && counter>0 && ( (i<x-1 || i>x+1) || (j<y-1 || j>y+1) )){
          board[i][j]=-1;
          counter--;
        }
        else if(firstClick){
          board[i][j]=0;
        }
      }
    }
    firstClick = false;
  }while(counter>0);
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
  gameTable.innerHTML = innerhtml;
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
  //Initialise certaines var globales
  size = s;
  bombs = Math.round(size*size*ratio);
  cpt.innerText = bombs;
  firstClick=true;
  time=0;
  /*int -> HTMLElement[]*/
  initInnerHTML();                         // Create the HTML board
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
  //On first click
  if(firstClick){
    //Create the board
    initGame(x,y);
    //Create a timer
    timer = setInterval(function(){
      time++;
      var sec = Math.floor(time%60);
      var min = Math.floor((time%(60*60))/60);
      if(min<10){
        if(sec<10){
          timerHTML.innerText = "0"+min+":0"+sec;
        }
        else{
          timerHTML.innerText = "0"+min+":"+sec;
        }
      }
      else{
        if(sec<10){
          timerHTML.innerText = min+":0"+sec;
        }
        else{
          timerHTML.innerText = min+":"+sec;
        }
      }
    },1000)
  }
  //On all clicks
  if(htmlBoard[x].childNodes[y].getAttribute("id")!="flag" && htmlBoard[x].childNodes[y].getAttribute("id")!="bloque" && htmlBoard[x].childNodes[y].getAttribute("id")!="visible"){
    switch (board[x][y]){
      case -1 :
        lost(x,y);
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
      bombs--;
      break;
    case "" :
      htmlBoard[x].childNodes[y].setAttribute("id","flag");
      bombs--;
      break;
    case "flag" :
      htmlBoard[x].childNodes[y].setAttribute("id","questionMark");
      htmlBoard[x].childNodes[y].innerText = "?";
      bombs++;
      break;
    case "questionMark" :
      htmlBoard[x].childNodes[y].setAttribute("id","");
      htmlBoard[x].childNodes[y].innerText = "";
      break;
  }
  cpt.innerText = bombs;
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

function lost(x,y){
  clearInterval(timer);
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[i].length;j++){
      if(htmlBoard[i].childNodes[j].getAttribute("id")!="visible")
        htmlBoard[i].childNodes[j].setAttribute("id","bloque"); // Empêche de continuer à jouer
      if(board[i][j]==-1)
        htmlBoard[i].childNodes[j].setAttribute("id","bomb");// Affiche toutes les bombess
    }
  }
  htmlBoard[x].childNodes[y].setAttribute("id","theOne");
  gameTable.setAttribute("id","loose");
}

function win(){
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      if((htmlBoard[i].childNodes[j].getAttribute("id")=="" || htmlBoard[i].childNodes[j].getAttribute("id")==null) && board[i][j]!=-1){
        return ;
      }
    }
  }
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      if(board[i][j]==-1)
        htmlBoard[i].childNodes[j].setAttribute("id","bloque");// Bloque le plateau
    }
  }
  clearInterval(timer);
  gameTable.setAttribute("id","win");
}

//************************************************************** Start game **************************************************************

Init(10);
