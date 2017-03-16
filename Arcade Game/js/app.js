var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
};

// Enemies our player must avoid
var Enemy = function(x,y) {

    //sets image for enemy
    this.sprite = 'images/enemy-bug.png';

    //set enemy positions
    this.x = x;
    this.y = y;

    //speed multiplier
    this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + 101 * dt * this.multiplier;

    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)){

        player.reset();
    }
    if (this.x > 505) {
        this.reset();
    }

};
// Calculates random bug movement
Enemy.prototype.reset = function() {
    this.x = -200;
    var yVals = [220, 140, 60];
    this.y = yVals[Math.floor((Math.random() * 3))];
    this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////Player class/////
var Player = function(x,y) {

    this.sprite = 'images/char-boy.png';

    this.x = x;
    this.y = y;

    this.xo = x;
    this.yo = y;
};

// Once player reaches water, alert will pop up
Player.prototype.playerWin = function() {
    if (this.y <= 0) {
        alert("You Win! Press Okay to play again.")
        this.reset()
        console.log("You Win!")
    }
}

// Moves player one tile when directional buttons pushed
Player.prototype.handleInput = function(dir) {

        if (dir == 'up') {
            this.y = this.y - 80;
        } else if (dir == 'down') {
            this.y = this.y + 80;
        } else if (dir == 'left') {
            this.x = this.x - 101;
        } else if (dir == 'right') {
            this.x = this.x + 101;
        }
// Resets if player goes off screen
        if(this.x < 0) {
            this.x = 0;

        } else if (this.x > 404) {
            this.reset();

        } else if (this.y > 404) {
            this.reset();

        } else if (this.y < 0) {
            this.y = 0;
        }

};

// Draw player on the screen
Player.prototype.reset = function() {

    this.x = this.xo;
    this.y = this.yo;

    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(){
    this.playerWin();

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies = [];

var yVals = [220, 140, 60];

for (var i = 0; i < 5; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = yVals[Math.floor(Math.random() * 3)];
    var enemy = new Enemy(x, y);
    allEnemies.push(enemy);
}

var player = new Player(200, 380);

var xVals = [0, 101, 202, 303, 404, 505, 606];

var xyLocations = [];

var winPositions = [[101, 35], [202, 35], [303, 35], [404, 35], [505,35]];
var game = new Game();
