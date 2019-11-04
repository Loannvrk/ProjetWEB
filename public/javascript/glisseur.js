function initInnerHTML(tab,size){
	var innerhtml = '';
	for(var i=0; i<size; i++){
		innerhtml += "<tr>";
		for (var j=0;j<size; j++){
			innerhtml += "<td> </td>";
		}
		innerhtml += "</tr>;
	}
	tab.innerHTML = innerhtml;
	return document.querySelectorAll("td");
}

function mettreCailloux(tab


