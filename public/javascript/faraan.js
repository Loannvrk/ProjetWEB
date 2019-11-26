function initInnerHTML() {
  /*void -> void
    creates an empty table in <table id=#game2048>*/
  var innerhtml = '<tbody>';
  for (var i=0 ; i <4; i++) {
    innerhtml += '<tr>'
    for (var j=0; j<4; j++) {
      innerhtml += '<th class=\'empty\'></th>'
    }
    innerhtml += '</tr>'
  }
  innerhtml += '</tbody>'
  document.getElementById('game2048').innerHTML = innerhtml;
}

function Init () {
  initInnerHTML(); //creates an empty table in <table id=#game2048>
}
//main
Init();
