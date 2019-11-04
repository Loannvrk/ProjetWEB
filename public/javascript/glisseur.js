function initInnerHTML(tab,size){
	var innerhtml = '';
	for(var i=0; i<size; i++){
		innerhtml += "<tr>";
		for (var j=0;j<size; j++){
			innerhtml += "<td> </td>";
		}
		innerhtml += "</tr>";
	}
	tab.innerHTML = innerhtml;
	return document.querySelectorAll("td");
}

function mettreCaillouxNivUn(tab,size){
	for(var i=0; i<size*size; i++){
		if (i==2 || i==7 || i==11 || i==18 || i==27 || i==35){
			tab[i].id = "cailloux";
		}
	}
}


function initKeydownListener(size) {
  window.addEventListener("keydown",bougerPerso(tab),true);
}

function bougerPerso(tab){
	var stop = false;
	if (keycode == 37){ //gauche
		while(!stop) {
			posX--;
			if (tab[posX+6*posY].id == "victoire"){
				return victoire();
			}
			if (posX < 0){
				posX = 5;
				tab[5].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY].id == "cailloux"){
				tab[posX+6*posY+1].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 39){ //droite
		while(!stop) {
			posX++;
			if (tab[posX+6*posY].id == "victoire"){
				return victoire();
			}
			if (posX > 5){
				posX = 5;
				tab[5].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY].id == "cailloux"){
				tab[posX+6*posY-1].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 38){ //enhaut
		while(!stop) {
			posY--;
			if (tab[posX+6*posY].id == "victoire"){
				return victoire();
			}
			if (posY < 0){
				posY = 0;
				tab[5].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY].id == "cailloux"){
				tab[posX+6*posY+6].id = "activeCell";
				stop =true;
			} 
		}
	}
	if (keycode == 40){ //enbas
		while(!stop) {
			posY++;
			if (tab[posX+6*posY].id == "victoire"){
				return victoire();
			}
			if (posY > 5){
				posY = 0;
				tab[5].id = "activeCell";
				stop = true;
			}
			if (tab[posX+6*posY].id == "cailloux"){
				tab[posX+6*posY-6].id = "activeCell";
				stop =true;
			} 
		}
	}
}
			
