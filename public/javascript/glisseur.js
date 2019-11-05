var posX=5;
var posY=0;
var CLICK=true;
var tab = [];
var size=0;
var audio = new Audio('./1408.wav');

function initInnerHTML(tabdejeux,size){
	var innerhtml = '';
	for(var i=0; i<size; i++){
		innerhtml += "<tr>";
		for (var j=0;j<size; j++){
			innerhtml += "<td id='case'> </td>";
		}
		innerhtml += "</tr>";
	}
	tabdejeux.innerHTML = innerhtml;
	return document.querySelectorAll("#case");
}

function mettreCaillouxEtVictoireNivUn(size){
	for(var i=0; i<size*size; i++){
		if (i==2 || i==7 || i==11 || i==18 || i==27 || i==35){
			tab[i].id = "cailloux";
		}
	}
	tab[17].id="victoire";
}
function mettreCaillouxEtVictoireNivDeux(size){
	for(var i=0; i<size*size; i++){
		if (i==14*6 || i==1+14*5 || i==3+14*3 || i==2+14*9 || i==5+14*12 || i==6+14*8 || i==7 || i==7+14*11 || i==8+14*6 || i==9+14*4 || i==9+14*12 || i==11 || i==12+14*7 || i==13+14 || i==13+14*10){
			tab[i].id = "cailloux";
		}
	}
	tab[13+14*9].id="victoire";
	tab[13+14*8].id="victoire";
}


function initKeydownListener() {
  window.addEventListener("keydown",faireBougerPerso(),true);
}

function faireBougerPerso() {
	console.log(tab);
	return function(event){bougerPerso(event.keyCode);};
}

function bougerPerso(keycode){
	console.log(tab);
	if(CLICK){
		var stop = false;
		switch(keycode){
			case 37://agauche
				var x=posX;
				while(!stop) {
				posX--;
				if (posX < 0 || tab[posX+6*posY]==undefined){
					tab[x+6*posY].id = "case";
					tab[5].id = "activeCell";
					posY = 0;
					posX = 5;
					stop = true;
				}
				if (tab[posX+6*posY].id == "victoire"){
					return victoire();
				}
				if (tab[posX+6*posY].id == "cailloux"){
					tab[x+6*posY].id = "case";
					tab[posX+6*posY+1].id = "activeCell";
					posX ++;
					audio.play();
					stop =true;
				} 
				}
				break;
			case 38://enhaut
				var y=posY;
				while(!stop) {
					posY--;
					if (posY < 0 || tab[posX+6*posY]==undefined){
						tab[posX+6*y].id = "case";
						tab[5].id = "activeCell";
						posY = 0;
						posX = 5;
						stop = true;
					}
					if (tab[posX+6*posY].id == "victoire"){
						return victoire();
					}
					if (tab[posX+6*posY].id == "cailloux"){
						tab[posX+6*y].id = "case";
						tab[posX+6*posY+6].id = "activeCell";
						posY++;
						audio.play();
						stop =true;
					} 
				}
				break;
			case 39://adroite
				var x=posX;
				while(!stop) {
					posX++;
					if (posX > 5 || tab[posX+6*posY]==undefined){
						tab[x+6*posY].id = "case";
						tab[5].id = "activeCell";
						posY = 0;
						posX = 5;
						stop = true;
					}
					if (tab[posX+6*posY].id == "victoire"){
						return victoire();
					}
					if (tab[posX+6*posY].id == "cailloux"){
						tab[x+6*posY].id = "case";
						tab[posX+6*posY-1].id = "activeCell";
						posX--;
						audio.play();
						stop =true;
					} 
				}
				break;
			case 40://enbas
				var y=posY;
				while(!stop) {
					posY++;
					if (posY > 5 || tab[posX+6*posY]==undefined){
						tab[posX+6*y].id = "case";
						tab[5].id = "activeCell";
						posY = 0;
						posX = 5;
						stop = true;
					}
					if (tab[posX+6*posY].id == "victoire"){
						return victoire();
					}
					if (tab[posX+6*posY].id == "cailloux"){
						tab[posX+6*y].id = "case";
						tab[posX+6*posY-6].id = "activeCell";
						posY--;
						audio.play();
						stop =true;
					} 
				}
				break;
		}
	}
	else{
			var stop = false;
		switch(keycode){
			case 37://agauche2
				var x=posX;
				while(!stop) {
				posX--;
				if (posX < 0 || tab[posX+14*posY]==undefined){
					tab[x+14*posY].id = "case";
					tab[13+14*13].id = "activeCell";
					posY = 13;
					posX = 13;
					stop = true;
					continue;
				}
				if (tab[posX+14*posY].id == "victoire"){
					return victoire2();
				}
				if (tab[posX+14*posY].id == "cailloux"){
					tab[x+14*posY].id = "case";
					tab[posX+14*posY+1].id = "activeCell";
					posX ++;
					audio.play();
					stop =true;
				} 
				}
				break;
			case 38://enhaut2
				var y=posY;
				while(!stop) {
					posY--;
					if (posY < 0 || tab[posX+14*posY]==undefined){
						tab[posX+14*y].id = "case";
						tab[13+13*14].id = "activeCell";
						posY = 13;
						posX = 13;
						stop = true;
						break;
					}
					if (tab[posX+14*posY].id == "victoire"){
						return victoire2();
					}
					if (tab[posX+14*posY].id == "cailloux"){
						tab[posX+14*y].id = "case";
						tab[posX+14*posY+14].id = "activeCell";
						posY++;
						audio.play();
						stop =true;
					} 
				}
				break;
			case 39://adroite2
				var x=posX;
				while(!stop) {
					posX++;
					if (posX > 13 || tab[posX+14*posY]==undefined){
						tab[x+14*posY].id = "case";
						tab[13+13*14].id = "activeCell";
						posY = 13;
						posX = 13;
						stop = true;
						continue;
					}
					if (tab[posX+14*posY].id == "victoire"){
						return victoire2();
					}
					if (tab[posX+14*posY].id == "cailloux"){
						tab[x+14*posY].id = "case";
						tab[posX+14*posY-1].id = "activeCell";
						posX--;
						audio.play();
						stop =true;
					} 
				}
				break;
			case 40://enbas2
				var y=posY;
				while(!stop) {
					posY++;
					if (posY > 13 || tab[posX+13*posY]==undefined){
						tab[posX+13*y].id = "case";
						tab[13+13*14].id = "activeCell";
						posY = 13;
						posX = 13;
						stop = true;
						continue;
					}
					if (tab[posX+14*posY].id == "victoire"){
						return victoire2();
					}
					if (tab[posX+14*posY].id == "cailloux"){
						tab[posX+14*y].id = "case";
						tab[posX+14*posY-14].id = "activeCell";
						posY--;
						audio.play();
						stop =true;
					} 
				}
				break;
		}
	}
}


function victoire(){
	alert("Pas mal!! Niveau suivant..");
	niv2();
}

function victoire2(){
	alert("VICTOIRE! Bravo");
}

function niv2(){
	posX=13;
	posY=13;
	CLICK = false;
	size=14;
	tab = initInnerHTML(document.getElementById("GameDiv"),size);
	mettreCaillouxEtVictoireNivDeux(size);
	tab[13+14*13].id="activeCell";
}

function niv1(){
	size=6;
	tab = initInnerHTML(document.getElementById("GameDiv"),size);
	mettreCaillouxEtVictoireNivUn(size);
	tab[5].id="activeCell";
	initKeydownListener();
}

niv1();
