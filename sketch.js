var gameState = "start";

var bear, bearIdle, bearRun, bearJump, bearFall;
var acornGroup, acornImage;
var branchesGroup, branchImage;
var jumpVelocity = 20;
var Xvel = 0;
var friction = 0.6;
var lives;
var acornGroup;
var acorn;

function preload(){
    acornImage = loadImage("Images/acorn.png");
    branchImage = loadImage("images/branch.png");

    bearIdle = loadAnimation("Images/bear/idle1.png", "Images/bear/idle2.png");
    bearRun = loadAnimation("Images/bear/run1.png", "Images/bear/run2.png", "Images/bear/run3.png", "Images/bear/run4.png", "Images/bear/run5.png", "Images/bear/run6.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    bear = createSprite(windowWidth/2, windowHeight/2);
    bear.addAnimation("Idle", bearIdle);
    bear.addAnimation("Run", bearRun);

    branchesGroup = new Group();
    acornGroup = new Group();

    spawnBranches();
}

function draw(){
    background(0);
    bear.x += Xvel;
    Xvel = Xvel * friction;
    bear.velocityY += 0.8;

    if(gameState === "start"){
        bear.velocityY = 0;
        Xvel = 0;
        lives = 3;
    }

    if(gameState === "start" && keyDown("space")){
        gameState = "level1";
    }

    if(gameState === "level1"){
        spawnAcron(80);

        //Player movement
        if(keyDown("RIGHT_ARROW")){
        Xvel = 10;
        } else if (keyDown("LEFT_ARROW")){
        Xvel = -10;
        } 

        if(Xvel < 0.1 && Xvel > -0.1){
        bear.changeAnimation("Idle", bearIdle);
        } else if(Xvel > 0 || Xvel < 0){
        bear.changeAnimation("Run", bearRun);
        }

        if(bear.isTouching(branchesGroup)){
        bear.velocityY = 0;
         }

        if(keyDown("UP_ARROW") && branchesGroup.isTouching(bear)){
        bear.velocityY = -20;
        } 

        if(bear.y < 0){
            bear.y = windowHeight/2;
            bear.x = windowWidth/2;
            branchesGroup.destroyEach();
            spawnBranches();
        }

        if(lives === 0){
            gameState = "end";
        }
    }

    if(gameState === "end"){
        reset();
    }

    drawSprites();
}

function reset(){
    gameState = "start";
    branchesGroup.destroyEach();
}

function spawnAcron(speed){
    if(frameCount % speed === 0){
        var acorn = createSprite(600, 0, 50, 50);
        acorn.x = random(50, windowWidth - 50);
        acorn.addImage(acornImage);
        acorn.scale = 0.3;
        acorn.velocityY += 10;

        acorn.lifetime = windowHeight/10;

        acornGroup.add(acorn);
    }
}

function spawnBranches(){
    for(var i = 0; i < windowWidth; i += 250){
        //for(var j = windowHeight; j > 0; j -= 200){
            var branch = createSprite(i, 200, 200, 20);
            branch.y = random(50, windowHeight - 100);
            branch.addImage(branchImage);
            branchesGroup.add(branch);
            branch.scale = 0.75;
            branch.setCollider("rectangle",30,20,400,50);
            branch.debug = true;
        //}
    }
}

