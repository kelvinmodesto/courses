// Using father class
const Character = function() {

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.handleInput = function() {

};

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'assets/images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player =  function() {

    this.pathImages = `assets/images/`;

    this.characters =   [
                        `${this.pathImages}char-boy.png`,
                        `${this.pathImages}char-cat-girl.png`,
                        `${this.pathImages}char-horn-girl.png`,
                        `${this.pathImages}char-pink-girl.png`,
                        `${this.pathImages}char-princess-girl.png`
                        ];
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {

};

Player.prototype.handleInput = function() {

};

Player.prototype.chooseCharacter = function() {

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
//console.log(enemy);

const player =  new Player();
//console.log(player);

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
