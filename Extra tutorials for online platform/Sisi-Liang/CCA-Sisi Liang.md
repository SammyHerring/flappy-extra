# Dynamic blocks
- fun1: Each block in the pipe has a probability of 20% to disappear after it appears on screen, making it easier to avoid pipes.

To implement this, we need to modify the code in the function 'addPipeBlock'. We generate a random number, 'flagDestroy', within the range (0, 5). If 'flagDestroy' is 0, we destroy the object after a certain amount of time, 'destroyTime'. Variable 'destroyTime' here is also generated randomly. To destroy the object, we add a new event to game.time.

The code is as follows.

### JavaScript Code
```JavaScript
function addPipeBlock(x, y) {
    // make a new pipe block
    var block = game.add.sprite(x,y,"pipe");
    // insert it in the pipe array
    pipes.push(block);
    // enable physics engine for the block
    game.physics.arcade.enable(block);
    // set the block's horizontal velocity to a negative value
    // (negative x value for velocity means movement will be towards left)

    block.body.velocity.x = -200;
    //new things here
    var flagDestroy = game.rnd.integerInRange(0, 5);
    if(flagDestroy == 0){
        var destroyTime = game.rnd.integerInRange(500, 1000);
        game.time.events.add(destroyTime, function() {block.destroy();}, this);
    }
}
```

- fun2: The blocks in each pipe come with different velocities

To implement this, we generate the blockVelocity randomly, instead of setting it to -200.
### JavaScript Code
```JavaScript
function addPipeBlock(x, y) {
    // make a new pipe block
    var block = game.add.sprite(x,y,"pipe");
    // insert it in the pipe array
    pipes.push(block);
    // enable physics engine for the block
    game.physics.arcade.enable(block);
    // set the block's horizontal velocity to a negative value
    // (negative x value for velocity means movement will be towards left)
    // generate the speed randomly
    var blockVelocity = game.rnd.integerInRange(-200, -400);
    block.body.velocity.x = blockVelocity;
}
```
