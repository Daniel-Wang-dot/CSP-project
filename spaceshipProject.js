//This is a game of Spaceship Pilot rating procedure 
//You can use'WASD'to control the spaceship to avoid the stones to hit you, 
// if not, 5 point you lost. 
//You can use left button to annihilate the enemies, which We represent by red points, 
// if you hit it, 1 point you get.
//you got 1 minute, if the time is end, game reset.
//Base one your performance, you can get your grade.
//if your score equal or greater than 10, you have S grade
//if your score greater than 6, you have A grade
//if your score greater than 3, you have B grade
//if your score greater than 0, you have C grade
//Otherwise, you get D
//There are 6 levels, you can go to next level only if you got S at previous level.
//if you got S at level 5, you win this game.
var x = 250;
var y = 400;
var a = 300;
var b = 300;
var speed = 2;
var score = 0;
var life = 5;
var grade = "Ungraded";
var lastShotTime=0;
var level=0;
var shotCooldown=level*1000;
var gameWin = false;
var time = 60;
var gamePaused = false;
let backgroundImage={
    y1:0,
    y2:-800,
    speed:1
};
let stones = [];
let totalstones = 10;
//This is for upload three images.
function preload()
{
    //stoneImage = loadImage("stone.jpg");
    stoneImage = loadImage("stone.jpg", () => {
        removeBackground(stoneImage);
    });
    spaceImage = loadImage("spaceship-png-icon-19.png", () => {
        removeBackground(spaceImage);
    });
    backgroundImage.bg1 = loadImage("universe.webp");
    backgroundImage.bg2 = loadImage("universe.webp");
}
//push the meteorolite to the list.
function setup()
{
    createCanvas(600,800);
    for(let i=0;i<totalstones;i++)
    {
        let stoneUse = createstones(random(width),random(height));
        stones.push(stoneUse);
    }
    
}
//recall the methods.
function draw() {
    background(220);
    drawBackground();
    moveBackground();
    startOver();
    drawship();
    record();

    if (!gamePaused){
        drawstones();
        fallingstones();
        moveship();
        enemy();
        attack();
        gameCheck();
        changeSpeed(3);
        gameOver();
    } else { 
        textSize(40);
        fill("white");
        stroke("black");
        strokeWeight(3);
        textAlign(CENTER, CENTER);
        text("Final Grade:"+grade,width/2,height/2);
        textSize(20);
        text("Press R to Restart", width/2, height/2+50);
    }

    if (gameWin) {
        textSize(50);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text("Congratulations, you win this game!", width / 2, height / 2);
        textSize(20);
        text("Press R to restart", width / 2, height / 2 + 50);
        noLoop();
    }
}
//the imformations of the meteorolite.
function createstones(x,y)
{
    return{
        x:x,
        y:y,
        radius:random(30, 50),
        color:[random(255),random(255),random(255)],
        speed:random(2,speed)
    }
}
//draw the meteorolite.
function drawstones()
{
    for(let i=0;i<stones.length;i++)
    {
        image(stoneImage, stones[i].x, stones[i].y, stones[i].radius, stones[i].radius);
    }
}
//make the meteorolite to move
function fallingstones()
{
    for(let i=0;i<stones.length;i++)
    {
        if(stones[i].y>height)
            {
                stones[i].y=0;
                stones[i].x=random(width);
            }
        else{
            stones[i].y+=stones[i].speed;
        }
    }
}
//this is a method to clean the background of the images
function removeBackground(img) {
    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        if (r > 200 && g > 200 && b > 200) {
            img.pixels[i + 3] = 0; 
        }
    }
    img.updatePixels();
}
//draw the universe background
function drawBackground()
{
    image(backgroundImage.bg1,0,backgroundImage.y1,600,800);
    image(backgroundImage.bg2,0,backgroundImage.y2,600,800);
}
//move the background
function moveBackground()
{
    backgroundImage.y1+=backgroundImage.speed;
    backgroundImage.y2+=backgroundImage.speed;
}
//keep the background move
function startOver()
{
    if(backgroundImage.y1>=800)
    {
        backgroundImage.y1=-800;
    }
    if(backgroundImage.y2>=800)
    {
        backgroundImage.y2=-800;
    }
}
//draw the spaceship
function drawship()
{
    image(spaceImage,x,y,100,100);
}
//control the ship by keyboards
function moveship()
{
    if(keyIsPressed&&keyCode==65)
        {
            x-=5;
        }
    else if(keyIsPressed&&keyCode==68)
        {            
            x+=5;
        }
    else if(keyIsPressed&&keyCode==87)
        {            
            y-=5;
        }
    else if(keyIsPressed&&keyCode==83)
        {            
            y+=5;
        }
}
//show the enemies on screen
function enemy()
{
    stroke('yellow')
    strokeWeight(3)
    fill("red");
    circle(a,b,30);
}
//Fire the laser to your enemies
function attack() {
    if (mouseIsPressed) {
        let currentTime=millis();
        if (currentTime-lastShotTime>=shotCooldown) {
            lastShotTime=currentTime;

            stroke('rgb(0, 255, 0)');
            strokeWeight(4);
            line(x+50,0,x+50,y);
            if (x+50>=a-15&&x+50<=a+15&&y>b) {
                a=random(100,500);
                b=random(100,500);
                score++;
            }
        }
    }
}
//record your score and your state
function record()
{
    stroke("orange");
    textSize(16);
    text("Score: ",30,30);
    text(score,80,30);
    text("Life:",30,60); 
    text(life,80,60);
    text("Grade: ",30,90);
    text(grade,80,90);
    text("Time: ",30,120);
    text(time,80,120);
    text("Level: ", 30, 150);
    text(level, 80, 150);
}
//which condition let score change
function gameCheck()
{
    for(let i=0;i<totalstones;i++)    {
        if(stones[i].x>=x+20&&stones[i].x<=x+80&&stones[i].y>=y+20&&stones[i].y<=y+80)
        {
            if(frameCount % 30 == 0)
            {
                score=score-5;
                life--;
            }
        }
    }
    if(frameCount % 60 == 0)
        {
            time--;
        }
}
//you can change the speed of meteorolite
function changeSpeed(newSpeed)
{
    speed=newSpeed;
}
//the condition to reset the game
function gameOver() {
    if (time<0||life<=0){
        if (score >= 10) {
            grade="S";
        } else if (score > 6) {
            grade="A";
        } else if (score > 3) {
            grade="B";
        } else if (score > 0) {
            grade="C";
        } else {
            grade="D";
        }

        if(grade==="S"){
            if (level<5) {
                level++;
            }else{
                gameWin=true;
            }
        } else {
            level=0;
        }

        shotCooldown=level*1000;
        gamePaused=true;
    }
}

function keyPressed() {
    if (gameWin&&key==='r'||key==='R') {
        level=0;
        shotCooldown=0;
        gameWin=false;
        loop();
    }
}

function resetGame() {
    x=250;
    y=400;
    a=300;
    b=300;
    speed=2;
    score=0;
    time=60;
    life=5;
    grade="Ungraded";
    gamePaused=false;
    stones=[];
    for (let i=0; i<totalstones;i++) {
        let stoneUse=createstones(random(width),random(height));
        stones.push(stoneUse);
    }
}
