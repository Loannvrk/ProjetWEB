const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:game',function(req,res){
  var file = req.params.game+".txt"
  fs.readFile("./data/"+file,"utf8",function(err,highscore){
    if(err) console.log(err);
    highscore = highscore.split("\n");
    for(var i=0;i<3;i++){
      if(highscore[i]=="x : -1"){
        highscore[i]="X ";
      }
    }
    res.render("highscore.hbs",{layout: false, first: highscore[0], second: highscore[1], third: highscore[2]});
  });
});

router.post('/:game',function(req,res){
  let newScore = req.body.time;
  let file = req.params.game+".txt";
  let score = [];
  fs.readFile("./data/"+file,"utf8",function(err,highscore){
    if(err) console.log(err);
    highscore = highscore.split("\n");
    highscore.forEach(function(item){
      score = score.concat(item.split(" : "));
    });
    for(var i=1;i<6;i+=2){
      if(parseInt(score[i])<0 || parseInt(score[i])>newScore){
        for(var j=5;j>=i+2;j-=2){
          score[j-1]=score[j-1-2];
          score[j]=score[j-2];
        }
        score[i-1] = req.body.name;
        score[i] = String(newScore);
        break;
      }
    }
    let data="";
    var show=[];
    for(var i=0;i<6;i+=2){
      let temp =  score[i]+" : "+score[i+1]+"\n";
      show.push(temp);
      if(temp=="x : -1"){
        temp="X ";
      }
      data += temp;
    }
    fs.writeFile("./data/"+file,data,(err)=>{
      if (err) console.log(err);
      res.render("highscore.hbs",{layout: false, first: show[0], second: show[1], third: show[2]});
    });
  });
});


module.exports = router;