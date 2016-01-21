export default class Game {
  // Initialize
  constructor() {
    this.centerx = 0;
    this.centery = 0;
    this.paddle1 = null;
    this.paddle2 = null;
    this.ball = null;
    this.cursors = null;

    this.phaserInstance = new Phaser.Game(550, 400, Phaser.AUTO, '', {
      preload: () => {
        this.preload();
      },
      create: () => {
        this.create();
      },
      update: () => {
        this.update();
      }
    });
  }
  // Load assets
  preload() {
    this.phaserInstance.load.image('paddle', 'images/paddle.png'); // 100x20px
    this.phaserInstance.load.image('ball', 'images/ball.png'); // 20x20px
  }
  
  // Start game
  create() {
    // Store the world's center points
    this.centerx = this.phaserInstance.world.width / 2;
    this.centery = this.phaserInstance.world.height / 2;

    // Enable physics system
    this.phaserInstance.physics.startSystem(Phaser.Physics.ARCADE);

    // Create paddles and ball
    this.paddle1 = this.phaserInstance.add.sprite(this.centerx - 50, 0, 'paddle');
    this.phaserInstance.physics.arcade.enable(this.paddle1); //Enable physics
    this.paddle1.enableBody = true; //Allow contact
    this.paddle1.body.immovable = true; //Don't allow ball to affect position
    this.paddle1.body.collideWorldBounds = true; // Don't allow offscreen

    this.paddle2 = this.phaserInstance.add.sprite(this.centerx - 50, this.phaserInstance.world.height - 20, 'paddle');
    this.phaserInstance.physics.arcade.enable(this.paddle2);
    this.paddle2.enableBody = true;
    this.paddle2.body.immovable = true;
    this.paddle2.body.collideWorldBounds = true;

    this.ball = this.phaserInstance.add.sprite(0, 0, 'ball');
    this.phaserInstance.physics.arcade.enable(this.ball);
    this.ball.body.bounce.x = 1.0;
    this.ball.body.bounce.y = 1.0;
    this.resetBall();

    // Prep controls
    this.cursors = this.phaserInstance.input.keyboard.createCursorKeys();
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
    if (this.ball.body.x + 20 > this.phaserInstance.world.width && this.ball.body.velocity.x > 0) {
      this.ball.body.velocity.x *= -1;
    }

    // Check top/bottom bounds
    if (this.ball.body.y < 0) {
      this.resetBall();
    }
    if (this.ball.body.y + 20 > this.phaserInstance.world.height) {
      this.resetBall();
    }

    // Handle collisions
    this.phaserInstance.physics.arcade.collide(this.ball, this.paddle1);
    this.phaserInstance.physics.arcade.collide(this.ball, this.paddle2);
  }
}