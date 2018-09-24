//Father class for all Characters 
class Character {
    constructor(x,y,sprite) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.sprite = sprite;
    }

    update(dt) {  }

    // Draw the enemy on the screen, required method for game
    render(sprite,x,y) {
        ctx.drawImage(Resources.get(sprite), x, y);
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
        super.render(this.sprite,this.x,this.y);
    }

    //generate a random num for player's speed 
    generateSpeed(){
        return Math.floor(Math.random()*(250-225)+225);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor() {
        super(200,400);
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
        this.star = `${this.pathImages}Star.png`;
        //steps counter
        this.steps = 0;
    }

    //reset the player's position for the initial position
    reset() {
        this.x=200;
        this.y=400;
        this.steps=0;
    }

    render() {
        super.render(this.sprite, this.x, this.y);
    }

    //check 
    update() {
        this.isWinner()?this.actionFinal():false;
    }

    checkCollisions(allEnemies) {
        allEnemies.map((enemy) => {
            this.x < enemy.x + enemy.width && 
            this.x + this.width > enemy.x && 
            this.y < enemy.y + enemy.height && 
            this.height + this.y > enemy.y?
            this.reset():false;
        });
    }

    handleInput(e) {
        switch (e) {
            case 'up':
                this.moveUp();
                break;
            case 'right':
                this.moveRight();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            default:
                break;
        }
        this.steps++;

    }

    //check if the player's the winner
    isWinner() {
        return this.y<=0;
    }

    //call success message and reset game
    actionFinal() {
        this.generateAlertMessage("Good Job!",`You won using ${this.steps} steps`,'success');
        this.reset();
    }

    //generate a alert message using Sweet Alert
    // Parameter: title,text,icon , title message, text message and icon message 
    generateAlertMessage(title,message,icon) {
        swal({
          title: title,
          text: message,
          icon: icon,
        });
    }

    //move player to left
    moveLeft() {
        this.x>0?this.x-=101:false;
    }

    //move player to right
    moveRight() {
        this.x<303?this.x+=101:false;
    }   

    //move player to top
    moveUp() {
        this.y>0?this.y-=83:false;
    }

    //move player to bottom
    moveDown() {
        this.y<332?this.y+=83:false;
    }

    //random choice of sprite characters
    chooseCharacter() {
        return Math.floor(Math.random()*(4+1))
    }
}

//Game general class
class Frogger {
    constructor(allEnemies,player) {
        this.allEnemies = allEnemies;
        this.player = player;
    }

    //randomly generate enemies
    // Parameters: max,min, bug speed interval
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
    //get a random number in a interval
    // Parameter: max,min, numbers interval
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

frogger.runEnemies(2000,1000); 

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
