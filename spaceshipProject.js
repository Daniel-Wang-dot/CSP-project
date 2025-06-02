//This is a game of Spaceship Pilot rating procedure 
//You can control the spaceship to avoid the stones to hit you, 
// if not, one point you lost. 
//You can control the spaceship to annihilate the enemies, which I represent by red points, 
// if you hit it, one point you get.
//Base one your performance, you can get your grade.
//if time is end, game reset.
//Using w,a,s,d to control the spaceship, 
//if your score equal or greater than 10, you have S grade
//if your score greater than 6, you have A grade
//if your score greater than 3, you have B grade
//if your score greater than 0, you have C grade
//Otherwise, you get F
var x = 250;
var y = 400;
var a = 300;
var b = 300;
var speed = 2;
var score = 0;
var state = "Fine";
var grade = "Ungraded";
var time = 60;
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
    //stoneImage = loadImage("/images/stone.jpg");
    stoneImage = loadImage("/images/stone.jpg", () => {
        removeBackground(stoneImage);
    });
    spaceImage = loadImage("/images/spaceship-png-icon-19.png", () => {
        removeBackground(spaceImage);
    });
    backgroundImage.bg1 = loadImage("/images/universe.webp");
    backgroundImage.bg2 = loadImage("/images/universe.webp");
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
function draw()
{
    background(220);
    drawBackground();
    moveBackground();
    startOver();
    drawstones();
    fallingstones();
    drawship();
    moveship();
    enemy();
    record();
    gameCheck();
    changeSpeed(3);
    attack();
    gameOver();
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
    fill("red");
    circle(a,b,30);
}
//Fire the laser to your enemies
function attack()
{
    if(mouseIsPressed)
    {
        state="Fine";
        stroke('rgb(0, 255, 0)');
        strokeWeight(4);
        line(x+50,0,x+50,y);
        if(x+50>=a-15&&x+50<=a+15&&y>b)
        {
            a=random(100,500);
            b=random(100,500);
            score++;
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
    text("State: ",30,60);
    text(state,80,60);
    text("Grade: ",30,90);
    text(grade,80,90);
    text("Time: ",30,120);
    text(time,80,120);
}
//which condition let score change
function gameCheck()
{
    for(let i=0;i<totalstones;i++)    {
        if(stones[i].x>=x+20&&stones[i].x<=x+80&&stones[i].y>=y+20&&stones[i].y<=y+80)
        {
            if(frameCount % 30 == 0)
            {
                score--;
            }
            state="Crash";
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
function gameOver()
{
    if(time<0)
        {
            x = 250;
            y = 400;
            a = 300;
            b = 300;
            speed = 2;
            if(score>=10)
            {
                grade="S";
            }
            else if(score>6)
            {
                grade="A";
            }
            else if(score>3)
            {
                grade="B";
            }
            else if(score>0)
            {
                grade="C";
            }
            else{
                grade="F";
            }
            score=0;
            time=60;
        }
}
