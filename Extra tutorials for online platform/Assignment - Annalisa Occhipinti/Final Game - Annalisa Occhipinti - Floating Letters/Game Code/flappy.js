// the functions associated with preload, create and update.
var actions = { preload: preload, create: create, update: update };
// the Game object used by the phaser.io library
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
// Global score variable initialised to 0.
var score = 0;
// Global variable to hold the text displaying the score.
var labelScore;
// Global player variable declared but not initialised.
var player;
// Global pipes variable initialised to the empty array.
var pipes = [];
// the interval (in seconds) at which new pipe columns are spawned
var pipeInterval = 2.5;
// Global letters variable initialised to the empty array.
var letters = [];
// Global letterPosition variable initialised to the empty array.
var lettersPosition = [];
// Global newLetter variable eclared but not initialised.
var newLetter;
// Global collectedLetters variable initialised to a zero-array as long as the
// "Flappy Bird" string (11 including the space).
var collectedLetters = new Array(11).fill(0);
// Global FBtext variable declared but not initialised.
var FBtext;


// Loads all resources for the game and gives them names.
function preload() {
    // make image file available to game and associate with alias playerImg
    game.load.image("playerImg","../assets/flappy.png");
    // make sound file available to game and associate with alias score
    game.load.audio("score", "../assets/point.ogg");
    // make image file available to game and associate with alias pipe
    game.load.image("pipe","../assets/pipe_mint.png");
    // make letters file available to game and associate with alias letterX
    game.load.image("letterF","../assets/letters/F.png");
    game.load.image("letterL","../assets/letters/L.png");
    game.load.image("letterA","../assets/letters/A.png");
    game.load.image("letterP","../assets/letters/P.png");
    game.load.image("letterY","../assets/letters/Y.png");
    game.load.image("letterB","../assets/letters/B.png");
    game.load.image("letterI","../assets/letters/I.png");
    game.load.image("letterR","../assets/letters/R.png");
    game.load.image("letterD","../assets/letters/D.png");
}

// Initialises the game. This function is only called once.
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#ffccff");
    // add welcome text
    game.add.text(20, 20, "Welcome to my game",
        {font: "30px Arial", fill: "#FFFFFF"});
    // add score text
    labelScore = game.add.text(20, 60, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
    // initialise the player and associate it with playerImg
    player = game.add.sprite(80, 200, "playerImg");
    // Start the ARCADE physics engine.
    // ARCADE is the most basic physics engine in Phaser.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // enable physics for the player sprite
    game.physics.arcade.enable(player);
    // set the player's gravity
    player.body.gravity.y = 200;
    // associate spacebar with jump function
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    // time loop for game to update
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
    // the interval (in seconds) at which new letters are spawned
    var lettersInterval = 3.5;
    // time loop for game to generate letters
    game.time.events.loop(lettersInterval * Phaser.Timer.SECOND, generateLetters);
    // add the string "Flappy Bird" on the game canvas
    FBtext = game.add.text(20, 350, "Flappy Bird",
        {font: "40px Arial", fill: "#4d79ff",fontWeight: "bold"});
}

// This function updates the scene. It is called for every new frame.
function update() {
    // Call gameOver function when player overlaps with any pipe

    game.physics.arcade
        .overlap(player,
            pipes,
            gameOver);

    // for each letter in the game canvas
    for(var i=0; i< letters.length; i++){
       // if there is any overlaps
       if (game.physics.arcade.overlap(player,letters[i])){
        // increase your score
        updateScore();
        //add the position of the new collected letter in the collectedLetters array
        collectedLetters[lettersPosition[i]] = 1;
        updateColour();
        // remove the letter i from the game canvas
        letters[i].destroy();
        // remove the letter i from the array letters
        letters.splice(i,1);
        // remove the position of letter i from the lettersPosition array
        lettersPosition.splice(i,1);
        // update colour

        }
    }
}

// Adds a pipe part to the pipes array
function addPipeBlock(x, y) {
    // make a new pipe block
    var block = game.add.sprite(x,y,"pipe");
    // insert it in the pipe array
    pipes.push(block);
    // enable physics engine for the block
    game.physics.arcade.enable(block);
    // set the block's horizontal velocity to a negative value
    // (negative x value for velocity means movement will be towards left)
    block.body.velocity.x = -100;
}

// Generate moving pipe
function generatePipe() {
    // Generate  random integer between 2 and 5. This is the location of the
    // start point of the gap.
    var gapStart = game.rnd.integerInRange(2, 4);
    // Loop 8 times (8 is the height of the canvas).
    for (var count = 0; count < 8; count++) {
        // If the value of count is not equal to the gap start point
        // or end point, add the pipe image.
        if(count != gapStart && count != gapStart+1 && count != gapStart+2){
            addPipeBlock(750, count * 50);
        }
    }
    // Increment the score each time a new pipe is generated.
    changeScore();
}

function playerJump() {
    // the more negative the value the higher it jumps
    player.body.velocity.y = -150;
}

// Function to change the score
function changeScore() {
    //increments global score variable by 1
    score++;
    // updates the score label
    labelScore.setText(score.toString());
}

function gameOver() {
    // stop the game (update() function no longer called)
    location.reload();
}

// Generate floating letters
function generateLetters(){
    //display on the canvas one of the letters
    // for now let's display the first one
     pickLetter();
    //display on the canvas the newLetter sprite
    var letter = game.add.sprite(750,20,newLetter);
    //we need to scale it to the right size
    letter.scale.y = 0.5;
    letter.scale.x = 0.5;
    // insert it in the array letters
    letters.push(letter);
    // enable physics engine for the letter
    game.physics.arcade.enable(letter);
    // set the letters's velocity
    // (negative x value for velocity means movement will be towards left)
    letter.body.velocity.x = -80;
    letter.body.velocity.y = 20;
}

function pickLetter() {
    // generate random numbers corresponding to the position of letters in the
    // "Flappy Bird" array containing 10 letters - from 0 to 9 excluding the space
    var diceRoll = game.rnd.integerInRange(0, 9);
    switch (diceRoll) {
    case 0:
        newLetter = "letterF";
        lettersPosition.push(0);
        break;
    case 1:
        newLetter = "letterL";
        lettersPosition.push(1);
        break;
    case 2:
        newLetter = "letterA";
        lettersPosition.push(2);
        break;
    case 3:
        newLetter = "letterP";
        lettersPosition.push(3);
        break;
    case 4:
        newLetter = "letterP";
        lettersPosition.push(4);
        break;
    case 5:
        newLetter = "letterY";
        lettersPosition.push(5);
        break;
    case 6:
        newLetter = "letterB";
        // the position of letter B is 7 because of the space
        //between the word "Flappy" and "Bird"
        lettersPosition.push(7);
        break;
    case 7:
        newLetter = "letterI";
        lettersPosition.push(8);
        break;
    case 8:
        newLetter = "letterR";
        lettersPosition.push(9);
        break;
    case 9:
        newLetter = "letterD";
        lettersPosition.push(10);
        break;
    }
}

function updateScore(){
    changeScore();
    changeScore();
}

function updateColour(){
  // for each letter in the array of the collected letters
  for(i=0; i < collectedLetters.length; i++){
        // if the letter i has been collected, turn it into red
        if(collectedLetters[i] == 1){
            FBtext.addColor('#ff0000', i); //#ff0000 is red
        }
        // if the letter i has not been collected turn it into white
        if(collectedLetters[i] == 0){
           FBtext.addColor('#4d79ff', i); //#4d79ff is blue
        }
    }
}
