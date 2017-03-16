var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.multiplier = Math.floor((Math.random() * 5) + 1);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + 101 * dt * this.multiplier;

    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)){
        game.gameOver = true;
       } else {
        player.reset
    }
    if (this.x > 505) {
        this.reset();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.reset = function() {
    this.x = -200;
    var yVals = [220, 140, 60];
    this.y = yVals[Math.floor((Math.random() * 3))]
    this.multiplier = Math.floor((Math.random() * 5) + 1);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y) {

    this.sprite = 'images/char-boy.png';

    this.x = x;
    this.y = y;

    this.xo = x;
    this.yo = y;
};

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

        if(this.x < 0) {
            this.x = 0;

        } else if (this.x > 606) {
            this.x = 606

        } else if (this.y > 404) {
            this.reset();

        }
        var win = true;

        if (win) {
            game.gameWin = true;
        }

};

Player.prototype.reset = function() {

    this.x = this.xo;
    this.y = this.yo;

    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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


var game = new Game();
