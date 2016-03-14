var rightCorner = 505;
var bottomCorner = 404;
var tileWidth = 101;
var tileHeight = 83;
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x= x;
    this.y= y;
    this.speed = Math.floor(Math.random() * 300 + 200);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkPosition = function() {
    if(player !== undefined) {
        var dx = this.x - player.x;
        var dy = this.y - player.y; 
        var abs = Math.sqrt(dx*dx + dy*dy);
        if (abs<40){
            console.log('Collision!');
            player.x = 202;
            player.y = 404;

        }
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.checkPosition();
     if(this.x < rightCorner) {
        this.x += dt * this.speed;
    }
    else {
        this.x = 0;
    }
    
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
var player = function(x, y){
    //location
    this.x= 202;
    this.y= 404;
    //image
    this.sprite = 'images/char-boy.png';
};

player.prototype.update = function(dt) {
    this.checkPosition();
};

player.prototype.checkPosition = function() {
    if(player.y < -0.5){
        console.log('You Win!');
    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(key) {
    
    switch(key) {
        case 'left':
        if(this.x - tileWidth < 0){
            this.x = 0;
        }
        else {
            this.x -= tileWidth;
        }
        break;

        case 'right':
        if(this.x + tileWidth >= rightCorner){
            this.x = 404;
        }
        else {
            this.x += tileWidth;
        }
        break;

        case 'up':
        if(this.y <= -11){
        break;
        }
        else {
            this.y -= tileHeight;
        }
        break;

        case 'down':
        if(this.y + tileHeight >= bottomCorner){
            this.y = 404;
        }
        else {
            this.y += tileHeight;
        }
        break;
    }
    console.log(key, 'this.x =', this.x, 'this.y=', this.y);

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 6; i++){
    var enemyX = (Math.floor(Math.random() * (6 - 1)) + 0) *tileWidth;
    var enemyY = (Math.floor(Math.random() * (4 - 1)) + 1) *tileHeight;
    var enemy = new Enemy(enemyX, enemyY);
    allEnemies.push(enemy);
}
var player = new player(202,404);

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