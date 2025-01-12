//board
let board;
let boardWidth = 320;
let boardHeight = 576;
let context;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodlerHeight
}

// variable for background music
let gameOverMusic = new Audio("images/backgroundmusic.mp3"); //starting and end point sound
let jumpSound = new Audio("images/jump.mp3"); //jump sound

//physics
let velocityX = 0; 
let velocityY = 0; //doodler jump speed
let initialVelocityY = -8; //starting velocity Y
let gravity = 0.4;

//platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;
  
//enemy
let enemyArray = [];
let enemyWidth = 30;
let enemyHeight = 30;
let enemySpeed = 1; // Movement speed
let enemyImg = new Image();
enemyImg.src = "images/enm.png";
enemyImg.onload = function () {
    console.log("Enemy image loaded successfully");
};
enemyImg.onerror = function () {
    console.error("Failed to load enemy image");
};



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

   

    //load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "images/cR.png";
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function() {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }





    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "images/cl.png";

    platformImg = new Image();
    platformImg.src = "images/ib.png";

    velocityY = initialVelocityY;
    placePlatforms();
    placeEnemies();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}

let gameOverSoundPlayed = false;

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    
    context.clearRect(0, 0, board.width, board.height);

    //doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth) {
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width < 0) {
        doodler.x = boardWidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height) {
        gameOver = true;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    //platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && doodler.y < boardHeight*3/4) {
            platform.y -= initialVelocityY; //slide platform down
        }
        if (detectCollision(doodler, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; //jump
            jumpSound.play();
           
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    
    }

    placeEnemies();
    // Enemies
    for (let i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i];

        // Move enemy left or right
        enemy.x += enemy.direction * enemySpeed;

        // Reverse direction if enemy hits canvas edges
        if (enemy.x <= 0 || enemy.x + enemy.width >= boardWidth) {
            enemy.direction *= -1;
        }

        // Draw enemy
        context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);

        // Check collision with doodler
        if (detectCollision(doodler, enemy)) {
            gameOver = true;
            console.log("Game Over: Collision with enemy");
        }
    }

    // clear platforms and add new platform
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift(); //removes first element from the array
        newPlatform(); //replace with new platform
    }



    


    updateScore(); // Call the updateScore function to track score
    // Display score on canvas
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.fillText("Score: " + score, 5, 20);

    // Display high score on canvas
    let highScore = localStorage.getItem("highScore") || 0;
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.fillText("High Score: " + highScore, boardWidth - 120, 20);


    if (gameOver) {

        // Update high score if the current score is greater
    let highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
        // Play the game over sound only once
        if (!gameOverSoundPlayed) {
        gameOverMusic.play();  // Play the game over sound
        gameOverSoundPlayed = true;  // Mark the sound as played
        }
        
        // Set font and style for the "Game Over" text
        context.font = "bold 40px Arial";
        context.strokeStyle = "white"; 
        context.lineWidth = 4; 
        let gameOverText = "Game Over";
        let gameOverTextWidth = context.measureText(gameOverText).width;
        context.strokeText(gameOverText, (boardWidth - gameOverTextWidth) / 2, boardHeight / 2);
        context.fillStyle = "red";
        context.fillText(gameOverText, (boardWidth - gameOverTextWidth) / 2, boardHeight / 2);
    
        // Set font and style for the "Press 'Space' to Restart" text
        context.font = "20px Arial";
        context.fillStyle = "black";
        let restartText = "Press 'Space' to Restart";
        let restartTextWidth = context.measureText(restartText).width;
        context.fillText(restartText, (boardWidth - restartTextWidth) / 2, boardHeight / 2 + 40);
    }

    
    
}

function moveDoodler(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") { //move right
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") { //move left
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
    else if (e.code == "Space" && gameOver) {
         // Stop the game over music
    gameOverMusic.pause();  // Stop the sound
    gameOverMusic.currentTime = 0;  // Reset sound to the beginning
    
        //reset
        doodler = {
            img : doodlerRightImg,
            x : doodlerX,
            y : doodlerY,
            width : doodlerWidth,
            height : doodlerHeight
        }
        
        

        velocityX = 0;
        velocityY = initialVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false;
        // Reset the game over sound flag
        gameOverSoundPlayed = false;
        placePlatforms();
           // Reset enemies
           enemyArray = [];  // Clear the enemy array so no enemies remain
        
           // Reset enemy speed if necessary
           enemySpeed = 2; // Reset enemy speed (if you want to reset speed)
    }
}

function placePlatforms() {
    platformArray = [];

    //starting platform
    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);


    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * boardWidth*3/4);
        let platform = {
            img : platformImg,
            x : randomX,
            y : boardHeight - 75*i - 120,
            width : platformWidth,
            height : platformHeight
        }
    
        platformArray.push(platform);
    }
}

function placeEnemies() {
    if (score > 20) { // Check if score is greater than 20
        // Ensure enemies are placed only once after score exceeds 20
        if (enemyArray.length === 0) {  // Only spawn enemies if they haven't already been placed
            for (let i = 0; i < platformArray.length; i++) {
                if (Math.random() < 0.3) { // 30% chance of an enemy on a platform
                    let platform = platformArray[i];
                    let enemy = {
                        img: enemyImg,
                        x: platform.x + platformWidth / 2 - enemyWidth / 2,
                        y: platform.y - enemyHeight,
                        width: enemyWidth,
                        height: enemyHeight,
                        direction: Math.random() < 0.5 ? -1 : 1 // Randomize movement direction
                    };
                    enemyArray.push(enemy);
                }
            }
        }
    }
}


function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth*3/4); //(0-1) * boardWidth*3/4
    let platform = {
        img : platformImg,
        x : randomX,
        y : -platformHeight,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function updateScore() {
    // Count platforms passed
    for (let i = 0; i < platformArray.length; i++) {
      let platform = platformArray[i];
  
      // If the doodler has passed this platform (y is below platform's y)
      if (doodler.y + doodler.height > platform.y && !platform.passed) {
        platform.passed = true; // Mark this platform as passed
        score++; // Increase score
      }
    }
  }
  function resetHighScore() {
    localStorage.removeItem("highScore");
    alert("High Score has been reset!");
}
