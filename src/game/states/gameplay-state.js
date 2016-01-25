export default class GameplayState extends Phaser.State {
  // Initialize
  constructor() {
    super();
    
    this.centerx = 0;
    this.centery = 0;
    this.paddle1 = null;
    this.paddle2 = null;
    this.ball = null;
    this.cursors = null;
  }
  // Load assets
  preload() {
    this.load.image('paddle', 'images/paddle.png'); // 100x20px
    this.load.image('ball', 'images/ball.png'); // 20x20px
  }
  
  // Start game
  create() {
    // Store the world's center points
    this.centerx = this.world.width / 2;
    this.centery = this.world.height / 2;

    // Enable physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // Create paddles and ball
    this.paddle1 = this.add.sprite(this.centerx - 50, 0, 'paddle');
    this.physics.arcade.enable(this.paddle1); //Enable physics
    this.paddle1.enableBody = true; //Allow contact
    this.paddle1.body.immovable = true; //Don't allow ball to affect position
    this.paddle1.body.collideWorldBounds = true; // Don't allow offscreen

    this.paddle2 = this.add.sprite(this.centerx - 50, this.world.height - 20, 'paddle');
    this.physics.arcade.enable(this.paddle2);
    this.paddle2.enableBody = true;
    this.paddle2.body.immovable = true;
    this.paddle2.body.collideWorldBounds = true;

    this.ball = this.add.sprite(0, 0, 'ball');
    this.physics.arcade.enable(this.ball);
    this.ball.body.bounce.x = 1.0;
    this.ball.body.bounce.y = 1.0;
    this.resetBall();

    // Prep controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  resetBall() {
    this.ball.body.x = this.centerx - 10;
    this.ball.body.y = this.centery - 10;
    this.ball.body.velocity.x = Math.floor(Math.random() * (100 - -100) + -100);
    this.ball.body.velocity.y = 100;

    // Increase bounce accel on each reset
    this.ball.body.bounce.x += 0.1;
    this.ball.body.bounce.y += 0.1;
  }
  // Main update loop
  update() {
    // Check human controls
    if (this.cursors.left.isDown) {
      this.paddle2.body.velocity.x = -250;
    } else if (this.cursors.right.isDown) {
      this.paddle2.body.velocity.x = 250;
    } else {
      this.paddle2.body.velocity.x = 0;
    }

    // Check "AI"
    this.paddle1.body.x = this.ball.body.x - 50;

    // Check walls
    if (this.ball.body.x < 0 && this.ball.body.velocity.x < 0) {
      this.ball.body.velocity.x *= -1;
    }
    if (this.ball.body.x + 20 > this.world.width && this.ball.body.velocity.x > 0) {
      this.ball.body.velocity.x *= -1;
    }

    // Check top/bottom bounds
    if (this.ball.body.y < 0) {
      this.resetBall();
    }
    if (this.ball.body.y + 20 > this.world.height) {
      this.resetBall();
    }

    // Handle collisions
    this.physics.arcade.collide(this.ball, this.paddle1);
    this.physics.arcade.collide(this.ball, this.paddle2);
  }
}