/***********************************************************************
                            Gloabal var
************************************************************************/
var menu = document.querySelector(".menu");
var cpt = document.querySelector(".counter");
var timerHTML = document.querySelector(".timer");
var gameTable = document.querySelector(".gameTable");// Ecran de jeu
gameTable.oncontextmenu = ()=>false; // Block the right-click menu on the game
var board=[];// Plateau contenant les éléments de jeu
//(-1 : bombe)(0 : case vide)(x>0 : case proche de x bombes)
var htmlBoard;
var size;
var bombs;// Nombre de bombes
var firstClick;
var timer;
var time;
const ratio = 0.15;// Ratio de bombes/cases
var colorTab = ["blue","green","red","purple","HotPink","OrangeRed"]

ajax.get("/highscore/demineur",{},function(res){
  document.querySelector("#highscore").innerHTML=res;
},function(){
  console.log("Erreur lors du post")
});

/***********************************************************************
                            Handler functions
************************************************************************/

function playOnCellHandler(x,y){
  /*void -> function*/
  return ()=>playOnCell(x,y);
}

function defCellHandler(x,y){
  /*void -> function*/
  return ()=>defCell(x,y);
}

function spreadCellHandler(x,y){
  /*void -> function*/
  return ()=>spreadCell(x,y);
}

/***********************************************************************
                            Init functions
************************************************************************/

function initGame(x,y){
  let counter = bombs;
  // Mise en place du plateau et du plateau visible par l'utilisateur
  do{
    for(var i=0;i<size;i++){
      if(firstClick)
        board[i]=[];
      for(var j=0;j<size;j++){
        if(Math.random() < ratio && counter>0 && ( (i<x-1 || i>x+1) || (j<y-1 || j>y+1) )){
          board[i][j]=-1;
          counter--;
        }
        else if(firstClick)
          board[i][j]=0;
      }
    }
    firstClick = false;
  }while(counter>0);
  // Détection du nombre de bombes sur les cases adjacentes
  for(var i=0;i<size;i++)
    for(var j=0;j<size;j++)
      if( board[i][j] != (-1) )
        detectionBomb(i,j,size);
}

// Initialize the graphic board
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

//Itinialize listeners
function initClickListeners(){
  for (var i=0; i<size; i++) {
    for(var j=0; j<size;j++){
      //Create listeners to play
      cell(i,j).onclick = playOnCellHandler(i,j);
      cell(i,j).oncontextmenu = defCellHandler(i,j);
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

/***********************************************************************
                             Functions
************************************************************************/

// Compte le nombre de bombes sur les cases adjacentes à la case (x,y)
function detectionBomb(x,y,size){
  var nbBomb=0;
  // Comptage du nombre de bombes sur cases adjacentes
  for(var i=x-1;i<=x+1;i++)
    for(var j=y-1;j<=y+1;j++)
      if( (i >= 0 && i < size) && (j >= 0 && j < size) && (board[i][j] == -1))
        nbBomb++;
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
        if(sec<10)
          timerHTML.innerText = "0"+min+":0"+sec;
        else
          timerHTML.innerText = "0"+min+":"+sec;
      }
      else{
        if(sec<10)
          timerHTML.innerText = min+":0"+sec;
        else
          timerHTML.innerText = min+":"+sec;
      }
    },1000)
  }
  //On all clicks
  if(gameTable.id!="loose" && gameTable.id!="win" && cell(x,y).id!="flag" && cell(x,y).className!="cell visible"){
    cell(x,y).className = "cell visible";
    switch (board[x][y]){
      case -1 :
        lost(x,y);
        return;
      case 0 :
        emptyCell(x,y);
        break;
      default :
        cell(x,y).innerText = board[x][y];
        cell(x,y).style.color = colorTab[board[x][y]-1];
        cell(x,y).ondblclick = spreadCellHandler(x,y);
        win();
    }
  }
}

function spreadCell(x,y){
  var flags = board[x][y];
  if(flags==0)
    return;
  for(var i=x-1;i<=x+1;i++)
    for(var j=y-1;j<=y+1;j++)
      if((i >= 0 && i < size) && (j >= 0 && j < size) && cell(i,j).id=="flag" )
        flags--;
  if(flags<1)
    for(var i=x-1;i<=x+1;i++)
      for(var j=y-1;j<=y+1;j++)
        if((i >= 0 && i < size) && (j >= 0 && j < size))
          playOnCell(i,j);
}

function defCell(x,y){
  if(gameTable.id=="win" || gameTable.id=="loose" || cell(x,y).className=="cell visible")
    return;
  switch(cell(x,y).id){
    case "" :
      cell(x,y).id = "flag";
      cell(x,y).innerHTML='<img src="./images/flag.svg" class="items"/>';
      bombs--;
      break;
    case "flag" :
      cell(x,y).id = "mark";
      cell(x,y).innerText = "?";
      cell(x,y).onclick = false;
      cell(x,y).ondblclick = playOnCellHandler(x,y);
      bombs++;
      break;
    case "mark" :
      cell(x,y).id = "";
      cell(x,y).innerText = "";
      cell(x,y).ondblclick = false;
      cell(x,y).onclick = playOnCellHandler(x,y);
      break;
  }
  cpt.innerText = bombs;
}

// Dévoile les cases adjacentes à la case vide (x,y)
function emptyCell(x,y){
  for(var i = x-1 ; i <= x+1; i++)
    for(var j = y-1; j <= y+1; j++)
        if( (i >= 0 && i < size) && (j >= 0 && j < size) && (cell(i,j).className != "cell visible") )
          playOnCell(i,j);
}

function cell(x,y){
  return htmlBoard[x].childNodes[y];
}

function lost(x,y){
  clearInterval(timer);
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[i].length;j++)
      if(board[i][j]==-1)
        cell(i,j).innerHTML = '<img src="./images/bomb.svg" class="items"/>';//Affiche toutes les bombes
  }
  cell(x,y).id = "bomb";
  gameTable.id = "loose";
}

function win(){
  for(var i=0;i<size;i++)
    for(var j=0;j<size;j++)
      if(cell(i,j).className=="cell" && board[i][j]!=-1)
        return;
  clearInterval(timer);
  gameTable.id = "win";
  var name = document.querySelector("form div").innerText;
  ajax.post("/highscore/demineur",{time,name},function(res){
    document.querySelector("#highscore").innerHTML=res;
  },function(){
    console.log("Erreur lors du post")
  });
}

/***********************************************************************
                              Start game
************************************************************************/

Init(15);
