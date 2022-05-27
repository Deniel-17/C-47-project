var bg
var player
var zombie1,zombieAnimation
var hunter,hunterAnimation
var bullet,b
var zombieGroup
var bulletGroup
var score=0
var life=3
var play=1, end=0, reset=2, gameState=play
var restart


function preload(){

background1 = loadImage("Images/Background/Background 1.jpeg");

Restart = loadImage("Images/Restart button.png");

b = loadImage("Images/Bullet.png");

zombieAnimation = loadAnimation("Images/Zombie 1 imgs/Z1.png",
"Images/Zombie 1 imgs/z2.png","Images/Zombie 1 imgs/z3.png",
"Images/Zombie 1 imgs/z4.png","Images/Zombie 1 imgs/z5.png",
"Images/Zombie 1 imgs/z6.png","Images/Zombie 1 imgs/z7.png",
"Images/Zombie 1 imgs/z8.png","Images/Zombie 1 imgs/z9.png");

hunterAnimation = loadAnimation("Images/Hunter/H1.png", "Images/Hunter/h2.png",
"Images/Hunter/H3.png", "Images/Hunter/H4.png", "Images/Hunter/H5.png");
  
 }


  function setup(){

createCanvas(windowWidth,windowHeight);

bg = createSprite(width/2,height/2);
bg.addImage(background1);

hunter = createSprite(100,height-100);
hunter.addAnimation("shooting", hunterAnimation);
hunter.scale = 3;

restart = createSprite(width/2,height/2);
restart.addImage(Restart);
restart.scale = 0.4;
restart.visible = false

zombieGroup = new Group()
bulletGroup = new Group()

  }
  

function draw() {
  background(0);

if(gameState===play){
hunter.visible = true

restart.visible = false
zombies()

if(keyDown("space")){
  bullet()
}
for(var i = 0;i<zombieGroup.length;i++){


if(zombieGroup.get(i).isTouching(bulletGroup)){
  bulletGroup.destroyEach()
  zombieGroup.get(i).destroy()
  score+=1
}
 }

 if(zombieGroup.isTouching(hunter)){
  hunter.visible = false
  life = life-1
  zombieGroup.setVelocityXEach(0)
  gameState=reset
 }

 if(life===0){
 gameState=end
 }

 drawSprites();

  }
 if(gameState===reset){
  restart.visible = true

 if(mousePressedOver(restart)){
  gameState=play
  zombieGroup.destroyEach()
  }

  drawSprites();

}


  fill("white")
  textSize(30)
  text("Kills : "+score,5,50)
  fill("white")
  stroke("red")
  strokeWeight(10)
  textSize(40)
  textFont("callestar")
  text("LIFE :"+life,width/2,100)

  if(gameState===end){
    fill("white")
    textSize(70)
    text("Game Over",width/2-50, height/2-100)
    text("Press Space To Reset",width/2-200, height/2)
   if(keyDown("space")){
   gameState=play
   life=3
   score=0
   zombieGroup.destroyEach()
    }

  }

}          

function zombies() {
if(frameCount%80===0){
  zombie1 = createSprite(width+50,height-100)
  zombie1.addAnimation("Running", zombieAnimation);
  zombie1.velocityX = -3
  zombie1.scale = 4
  zombieGroup.add(zombie1)
 }
 
}

 function bullet() {
  Bullet = createSprite(hunter.x,hunter.y,20,20);
  Bullet.addImage(b);
  Bullet.scale = 0.3;
  Bullet.velocityX = +5
  bulletGroup.add(Bullet)
  
 }