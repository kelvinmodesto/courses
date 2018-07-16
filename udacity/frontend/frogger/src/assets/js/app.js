class Character {
    constructor(x,y,sprite) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    update(dt) {  }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(x,y) {
        super(x,y,'assets/images/enemy-bug.png');
        this.speed = this.generateSpeed();
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed*dt;
    }

    render() {
        super.render();
    }

    generateSpeed(){
        return Math.floor(Math.random()*(250-75+1));
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x,y) {
        super(x,y,'assets/images/char-cat-girl.png');
        this.speed = 200;
        this.pathImages = `assets/images/`;
        this.characters =   [
                            `${this.pathImages}char-boy.png`,
                            `${this.pathImages}char-cat-girl.png`,
                            `${this.pathImages}char-horn-girl.png`,
                            `${this.pathImages}char-pink-girl.png`,
                            `${this.pathImages}char-princess-girl.png`
                            ];

    }

    render() {
        super.render();
    }

    handleInput(e) {
        switch (e) {
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            default:
                break;
        }
    }

    moveLeft() {
        if(this.x>0){
            this.x -=101; 
        }
    }

    moveRight() {
        if(this.x<303){
            this.x +=101;
        }
    }   

    moveUp() {
        if(this.y>0){
            this.y -=83;
        }
    }

    moveDown() {
        if(this.y<332){
            this.y +=83;
            
        }
    }

    chooseCharacter() {
        return Math.floor(Math.random()*(4+1))
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = []; 
window.setInterval(
    () => { 
        const e = new Enemy(0,50);
        const e2 = new Enemy(0,133);
        const e3 = new Enemy(0,216);
        allEnemies.push(e);
        allEnemies.push(e2);
        allEnemies.push(e3);
        e.render(); 
        e2.render();
        e3.render();
    },5000
);

let player =  new Player(200,382);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
