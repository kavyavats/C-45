var genius;
var ground;
var background_img;
var scene, obstacleGroup;
var obstacle1_img;
var gameState = "wait";
var textBox;
var playButton, endButton, againButton, invitation_img, invitation, genius_img, ground_img,question,correctAns;

function preload() {
  background_img = loadImage("background.jpg");
  obstacle1_img = loadImage("bullet-removebg-preview.png");
  obstacle2_img = loadImage("police.png");
  invitation_img = loadImage("invitation.png");
  genius_img = loadImage("genius-removebg-preview.png");
  ground_img = loadImage("ground.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 150);
  
  playButton = createButton("LET'S PLAY");
  playButton.position(width / 2, height / 2 - 200);

  endButton = createButton("END GAME");
  endButton.position(-30, -30);

  againButton = createButton("PLAY AGAIN!!");
  againButton.position(-30, -30);

  scene = createSprite(width / 2, height / 2, width, height);
  scene.addImage("background", background_img);
  scene.scale = 2;

  genius = createSprite(width / 10, height / 2, 50, 50);
  genius.addImage("hello", genius_img);
  genius.scale = 0.5;

  ground = createSprite(width / 2, height + 730, width, 20);
  ground.addImage("hello", ground_img);
  ground.scale = 12;
  
  obstacleGroup = new Group();

  invitation = createSprite(width / 2.1 + 70, height / 3, 50, 50);
  invitation.addImage("invitation", invitation_img);
  invitation.scale = 0.5;


}

function draw() {
  background("lightblue");

  drawSprites();

  if (gameState == "wait") {
    textSize(20);
    fill("white");
    text("1.This is a endless game press (end game) button to end.", width / 2 + 50, height / 2 + 10);
    text("2.There are 2 obstacle in the game. ", width / 2 + 50, height / 2 + 50);
    text("3. Whenever you touch the obstacle you will face a Maths Question.", width / 2 + 50, height / 2 + 90);
    text("4.If you answer is wrong game automatically ends!.", width / 2 + 50, height / 2 + 130);
    text("5.Press .", width / 2 + 50, height / 2 + 130);

  }

  playButton.mousePressed(function () {
    gameState = "play";
    endButton.position(width / 2 + 500, 50);
    invitation.visible = false;
  });

  if (gameState == "play") {
    //Jump
    if (keyDown("space") && genius.collide(ground)) {
      genius.velocityY = -15;
    }
    genius.velocityY = genius.velocityY + 0.5;

    scene.velocityX = -4;
    if (scene.x < 500) {
      scene.x = width / 2;
    }

    spawnObstacles();
    
    if (obstacleGroup.isTouching(genius)) {
        scene.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        genius.x -= 10
        spawnQuestion()
        var questionElement = createElement("h3",question)
        textBox = createInput("Answer")
        var ans = textBox.value()
        var submitButton = createButton("Submit")

        submitButton.mousePressed(function(){
            if(correctAns == ans){
                text("CORRECT ANS!!",width/2,height/2)
            }

            else{
                text("WRONG ANS!!",width/2,height/2)
            }

        })

    }
    
    playButton.position(-30, -30);
    againButton.position(-30, -30);
  }

  else if (gameState == "end") {

    fill("white");
    textSize(30);
    text("HEY CHAMP KEEP IT UP!!", width / 2 - 150, height / 2 - 10);

    scene.velocityX = 0;
    genius.velocityY = 0;

    obstacleGroup.destroyEach();
    obstacleGroup.setlifetimeEach = null;

    endButton.position(-30, -30);
    againButton.position(width / 2 - 15, height / 2 - 200 + 10);
  }
  
  endButton.mousePressed(function () {
    gameState = "end";
    invitation.visible = true;
  });

  againButton.mousePressed(function () {
    gameState = "play";
    endButton.position(width / 2 + 500, 50);
    invitation.visible = false;
  });
  
  genius.collide(ground);

}

function spawnObstacles() {
  if (frameCount % 250 == 0) {

    var run = Math.round(random(1, 2));

    if (run == 1) {
      var obstacle1 = createSprite(width, height - 110, 50, 50);
      obstacle1.setCollider("circle", 15, 10, 20);
      obstacle1.velocityX = -8;
      obstacle1.lifetime = - Math.round(width / obstacle1.velocityX);
      obstacle1.addImage("obstacle", obstacle1_img);
      obstacle1.scale = 0.6;
      obstacleGroup.add(obstacle1);
    }

    if (run == 2) {
      var obstacle2 = createSprite(width, height - 80, 50, 50);
      obstacle2.velocityX = -8;
      obstacle2.setCollider("circle", 15, 10, 20);
      obstacle2.lifetime = - Math.round(width / obstacle2.velocityX);
      obstacle2.addImage("obstacle", obstacle2_img);
      obstacle2.scale = 0.5;
      obstacleGroup.add(obstacle2);
    }
  }
}


function spawnQuestion() {
  var number1 = Math.round(random(20, 200));
  var operator;
  var rand = Math.round(random(1, 3));
  
  switch (rand) {
    case 1:
      operator = "+";
      break;

    case 2:
      operator = "-";
      break;

    case 3:
      operator = "*";
      break;

    default:
      break;
  }

  var number2 = Math.round(random(20, 200));

  fill("white");
  textSize(23)
  question = number1 + "+" + number2 + "="
  correctAns = number1 + number2 
}