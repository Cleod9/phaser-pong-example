import GameplayState from 'game/states/gameplay-state';

export default class Game extends Phaser.Game {
  // Initialize
  constructor() {
    super(550, 400, Phaser.AUTO, '');

    this.state.add('gameplay', GameplayState);

    this.state.start('gameplay');
  }
}