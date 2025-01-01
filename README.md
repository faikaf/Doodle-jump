#Doodle Jump

This repository contains a simple browser-based game inspired by the classic Doodle Jump. The game challenges players to control a character that jumps between platforms while avoiding enemies and trying to achieve the highest score possible.

Features:

1.Dynamic Platforms: Platforms move downward as the doodler progresses upward.

2.Enemy Obstacles: Enemies appear on platforms after a certain score threshold and move horizontally to increase difficulty.

3.Scoring System: Tracks the current score and displays the highest score achieved.

4.Physics Engine: Implements gravity and collision detection for realistic movements.

5.Sound Effects: Includes background music, jump sound effects, and a game-over sound.

6.Restart Option: Allows players to restart the game with a single key press.



Gameplay Instructions

  1.Use the Arrow Keys or WASD keys to move the doodler left or right.

  2.Jump on platforms to keep moving upward.

  3.Avoid enemies; colliding with one ends the game.

  4.Try to beat your high score!

  5.To restart the game after a game over, press Spacebar.


How to Run the Game

Prerequisites:

A modern web browser (e.g., Chrome, Firefox, Edge).

Basic understanding of HTML and JavaScript (optional, for code exploration).

Steps

Clone the repository:

git clone https://github.com/faikaf/doodle-jump.git

Open the project directory:

cd doodle-jump-clone

Open the index.html file in a browser.

Game Logic Overview



Main Components:


Doodler:

Controlled by the player using keyboard inputs.

Moves horizontally and jumps on platforms.


Platforms:

Serve as the main path for the doodler to ascend.

New platforms are generated as old ones move out of view.

Enemies:
Appear on platforms after a score of 20.
Move horizontally to increase difficulty.

Physics:
Gravity constantly pulls the doodler down.
Jumping applies an upward velocity.

Collision Detection:
Ensures the doodler interacts with platforms and enemies realistically.



Scoring:

Score increases as the doodler passes platforms.

The high score is stored in localStorage and displayed on the screen.

The high score can be reset by modifying the code to call the resetHighScore() function.


Controls:

  Arrow Right / D: Move right.

  Arrow Left / A: Move left.


Spacebar: Restart the game after a game over.

Assets:

  Images:
  
    Doodler images: cR.png, cl.png
    
    Platform image: ib.png
    
    Enemy image: enm.png
    

  Sounds:
  
    Background music: backgroundmusic.mp3
    
    Jump sound: jump.mp3
    
    Place all images and sounds in an images folder in the project directory.
    



Acknowledgments

  This game was created as a learning project, inspired by the original Doodle Jump game. Thanks to all open-source contributors who make such projects possible!

![Screenshot (45)](https://github.com/user-attachments/assets/66ccb837-cc7b-409d-9034-efbe6afa3225)

![Screenshot (47)](https://github.com/user-attachments/assets/d2c992b2-d613-4771-8aa2-a973b44b5725)
