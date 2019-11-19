const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

router.post('/:game/:name/:score',function(req,res){
  let newScore = req.params.score;
  let game = req.params.game;
  let score = [];
  fs.readFile("./data/"+game+".txt","utf8",function(err,highscore){
    highscore = highscore.split("\n");
    highscore.forEach(function(item){
      score = score.concat(item.split(" : "));
    });
    for(var i=1;i<6;i+=2){
      if(parseInt(score[i])>newScore){
        score[i-1]=req.params.name;
        score[i]=String(newScore);
        break;
      }
    }
    let data="";
    var show=[];
    for(var i=0;i<6;i+=2){
      let temp =  score[i]+" : "+score[i+1]+"\n";
      show.push(temp);
      data += temp;
    }
    res.render("index.hbs",{layout: false, first: show[0], second: show[1], third: show[2]})
    fs.writeFile("./data/"+game+".txt",data,(err)=>{
      if (err) console.log(err);
    });
  });
  res.sendStatus(200);
});

module.exports = router;
