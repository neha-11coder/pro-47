var gameState=0;
var score=0;
var name,hunter;
var title,input,button;
var health;
function setup() {
  createCanvas(windowWidth,windowHeight);
  hunter=createSprite(width/2,height-25, 50, 50);
  hunter.shapeColor="black"
  wildGroup=new Group();
  animalGroup=new Group();
  fruitGroup=new Group();
  netGroup=new Group();
  healthGroup=new Group();
  for(var i=width-50;i<width;i=i+20){
    health=createSprite(i,50,15,15);
    healthGroup.add(health);
  }
  
}

function draw() {
  background("blue"); 
  textSize(30);
  fill ("yellow")
  text("Score : "+score,0,60);
  title=createElement('h1');
  title.html("Rescue The Wild");
  title.position(width/2-50,10)
  console.log(gameState);
 
  if(gameState===0){
    hunter.visible=false;
    text("Click On Play To Start",width/2-100,height/3);
   
    input=createInput('Name');
    input.position(width/2-50,height/2.5)
    button=createButton('Play');
    button.class("customButton");
    button.position(width/2,height/2);
    button.mousePressed(()=>{
      //document.getElementById("input").style.display = "none";
      //button.hide();
      name=input.value();
      gameState=1;
    })

    

  }
  else if(gameState===1){
    textSize(30);
    fill("orange");
    text("Instructions :",width/6,height/4);
    text("1:Catch the wild animals and earn points",width/6,height/3);
    text("2:If you catch farm animals, you loose points",width/6,height/2.5);
    text("3:Pick the fruits to boost your energy",width/6,height/2.15);
    text("4:Use arrow keys to move the hunter ",width/6,height/1.9);
    text("5:Press Space to catch the animals",width/6,height/1.7);
    text("6:Click 'S' to Continue",width/6,height/1.55);

    if(keyCode===83){
      gameState=2;
    }

  }
  else if(gameState===2){
    hunter.visible=true;
    text("Name: "+ name,0,30);
    if(keyDown(UP_ARROW)){
      hunter.y=hunter.y-5;
    }else if(keyDown(RIGHT_ARROW)){
      hunter.x=hunter.x+5
    }
    else if(keyDown(DOWN_ARROW)){
      hunter.y=hunter.y+5
    }else if(keyDown(LEFT_ARROW)){
      hunter.x=hunter.x-5;
    }
    if(frameCount%80===0){
      var num=random(0,3);
      console.log(num);
      if(num>0&&num<=1){
        wAnimals();
      }else if(num>1&&num<=2){
        Animals();
      }else if(num>2&&num<=3){
        Fruits();
      }
    }
    if(keyIsDown(32)){
      Net();
      
    }
    if(netGroup.isTouching(animalGroup)){
      animalDestroy();
    }
    if(wildGroup.isTouching(hunter)){
      destroyHealth();
    }
    if(fruitGroup.isTouching(hunter)){
      fruitsDestroy();
    }
    if(wildGroup.isTouching(netGroup)){
      wildDestroy();
    }
  }
  

  drawSprites();
}
