var posX=5;
var posY=0;

function initInnerHTML(tabdejeux,size){
	var innerhtml = '';
	for(var i=0; i<size; i++){
		innerhtml += "<tr>";
		for (var j=0;j<size; j++){
			innerhtml += "<td> </td>";
		}
		innerhtml += "</tr>";
	}
	tabdejeux.innerHTML = innerhtml;
	return document.querySelectorAll("td");
}

function mettreCaillouxEtVictoireNivUn(tab,size){
	for(var i=0; i<size*size; i++){
		if (i==4 || i==9 || i==13 || i==20 || i==29 || i==37){
			tab[i].id = "cailloux";
		}
	}
	tab[19].id="victoire";
}


function initKeydownListener(tab) {
  window.addEventListener("keydown",faireBougerPerso(tab),true);
}

function faireBougerPerso(tab) {
	return function(event){bougerPerso(event.keycode,tab);};
}

function bougerPerso(keycode,tab){
	var stop = false;
	if (keycode == 37){ //gauche
		while(!stop) {
			alert("go");
			posX--;
			if (tab[posX+6*posY+2].id == "victoire"){
				return victoire();
			}
			if (posX < 0){
				posX = 5;
				tab[5+2].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY+2].id == "cailloux"){
				tab[posX+6*posY+1+2].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 39){ //droite
		while(!stop) {
			posX++;
			if (tab[posX+6*posY+2].id == "victoire"){
				return victoire();
			}
			if (posX > 5){
				posX = 5;
				tab[5+2].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY+2].id == "cailloux"){
				tab[posX+6*posY-1+2].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 38){ //enhaut
		while(!stop) {
			posY--;
			if (tab[posX+6*posY+2].id == "victoire"){
				return victoire();
			}
			if (posY < 0){
				posY = 0;
				tab[5+2].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY+2].id == "cailloux"){
				tab[posX+6*posY+6+2].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 40){ //enbas
		while(!stop) {
			posY++;
			if (tab[posX+6*posY+2].id == "victoire"){
				return victoire();
			}
			if (posY > 5){
				posY = 0;
				tab[5+2].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY+2].id == "cailloux"){
				tab[posX+6*posY-6+2].id = "activeCell";
				stop =true;
			} 
		}
	}
}

function victoire(){
	alert("Partie Fini! Victoire");
}

function main(){
	
	var tab = initInnerHTML(document.getElementById("GameDiv"),6);
	mettreCaillouxEtVictoireNivUn(tab,6);
	tab[7].id="activeCell";
	initKeydownListener(tab);
}
			
