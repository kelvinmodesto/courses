class Character {
    constructor(x,y,sprite) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
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
        this.width = 50;
        this.height = 50;
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
        return Math.floor(Math.random()*(250-200)+200);
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {

    constructor() {
        super(200,400,"");
        this.width = 50;
        this.height = 50;
        this.speed = 200;
        this.pathImages = `assets/images/`;
        this.characters =   [
                            `${this.pathImages}char-boy.png`,
                            `${this.pathImages}char-cat-girl.png`,
                            `${this.pathImages}char-horn-girl.png`,
                            `${this.pathImages}char-pink-girl.png`,
                            `${this.pathImages}char-princess-girl.png`
                            ];
        this.sprite = this.characters[this.chooseCharacter()];
    }

    reset(){
        this.x=200;
        this.y=400;
    }

    render() {
        super.render();
    }

    update(dt) {

    }

    checkCollisions(allEnemies) {
        allEnemies.map((enemy) => {
             this.x < enemy.x + enemy.width 
             && this.x + this.width > enemy.x 
             && this.y < enemy.y + enemy.height 
             && this.height + this.y > enemy.y?this.reset():false;
        });
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

    isWinner() {
        return this.y===0;
    }

    final() {
        // if()
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

class Frogger{

    constructor(allEnemies,player) {
        this.allEnemies = allEnemies;
        this.player = player;
    }


    runEnemies(max,min){
        setInterval(
            () => {
                const arr = [50,133,216].filter((elem,index,arr)=>{
                    return arr.indexOf(elem)<this.getRandomNumber(3,1);
                });
                arr.map((e) => {
                    const enemy = new Enemy(0,e);
                    this.allEnemies.push(enemy);
                    enemy.render();
                });
            },Math.floor(Math.random()*(max-min)+min)
        );
    }

   

    getRandomNumber(max,min){
        return Math.floor(Math.random()*max+min);
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
let player =  new Player();

const frogger = new Frogger(allEnemies,player);
frogger.runEnemies(2500,1000); 

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
