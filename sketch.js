var trex,trex_img;
var ground,ground_img;
var invisibleground;
var cloud;
var rand;
var cloudgroup;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var gameState="PLAY";
var obstaclegroup;
var rand2;
var count=0;
var resart;
var gameOver;
var trex_collided;

function preload(){
  trex_img= loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img=loadAnimation("ground2.png");
  cloud_img=loadAnimation("cloud.png");
  obstacle1_img=loadAnimation("obstacle1.png");
  obstacle2_img=loadAnimation("obstacle2.png");
  obstacle3_img=loadAnimation("obstacle3.png");
  obstacle4_img=loadAnimation("obstacle4.png");
  obstacle5_img=loadAnimation("obstacle5.png");
  obstacle6_img=loadAnimation("obstacle6.png");
  restart_img=loadAnimation("restart.png");
  gameOver_img=loadAnimation("gameOver.png");
  trex_collided_img=loadAnimation("trex_collided.png");
  
}

function setup() {
  createCanvas(600,200);
  trex = createSprite(50,165,20,20);
  trex.addAnimation("trex",trex_img);
  trex.scale =0.5;
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
  
  ground=createSprite(300,188,600,5);
  ground.addAnimation("ground",ground_img);
  
  invisibleground=createSprite(300,194,600,5);
  invisibleground.visible=false;
  
  gameOver=createSprite(222,110);
  gameOver.addAnimation("gameOver",gameOver_img);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart=createSprite(222,83);
  restart.addAnimation("restart",restart_img);
  restart.visible=false;
  restart.scale=0.6;
  
}

function draw() {
  background("white");
  trex.collide(invisibleground);
  text("score: "+count,519,20);
  
  if (gameState==="PLAY"){
  ground.setVelocity(-4,0);
  if(ground.x<0){
   ground.x=600;
  }
  
  count=count+Math.round(getFrameRate()/50);  
    
  if (keyDown("space") && trex.y>=168){
    trex.velocityY=-14;
    console.log(trex.y);
  }
    
  trex.velocityY=trex.velocityY+1;    
  
  clouds();
  obstacles(); 
    
  if(trex.isTouching(obstaclegroup)){
  gameState="END";  
  }  
  }
  
  if(gameState==="END"){
  trex.setVelocity(0,0);
  obstaclegroup.setVelocityEach(0,0);
  obstaclegroup.destroyEach();
  cloudgroup.setVelocityEach(0,0);
  cloudgroup.destroyEach();  
  ground.velocityX=0;
  gameOver.visible=true;
  restart.visible=true; 
  trex.addAnimation("trex_collided",trex_collided_img); 
  trex.changeAnimation("trex_collided",trex_collided_img);
 
  }   
  
if(mousePressedOver(restart)){
gameState="PLAY";
reset(); 
}  
  
  
  
  drawSprites();
  text(mouseX +","+mouseY,mouseX,mouseY);
}

function clouds(){
if(frameCount%120===0) {
cloud=createSprite(600,17,10,10) ;
  cloud.addAnimation("cloud",cloud_img);
  cloud.setVelocity(-4,0);
  rand=random(18,85);
  cloud.y=rand;
  cloud.lifetime=150;
  cloudgroup.add(cloud); 
} 
}

function obstacles(){
if(frameCount%140===0){
obstacle=createSprite(600,183,10,10);
obstacle.velocityX=-4;
obstacle.lifetime=150;  
rand2=Math.floor(random(1,6));
switch(rand2){
case 1:obstacle.addAnimation("obstacle1",obstacle1_img);
    
break;

case 2:obstacle.addAnimation("obstacle2",obstacle2_img);

break;    
    
case 3:obstacle.addAnimation("obstacle3",obstacle3_img);    
break;    
    
case 4:obstacle.addAnimation("obstacle4",obstacle4_img);

break;

case 5:obstacle.addAnimation("obstacle5",obstacle5_img);

break;

case 6:obstacle.addAnimation("obstacle6",obstacle6_img);
    
break;      
}
obstacle.scale=0.5;  
obstaclegroup.add(obstacle);
  
}  
}

function reset(){
gameState="PLAY";  
count=0;
gameOver.visible=false;
restart.visible=false;
trex.addAnimation("trex",trex_img);
 trex.changeAnimation("trex",trex_img); 
}



