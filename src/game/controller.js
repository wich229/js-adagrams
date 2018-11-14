class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.init({
      play: this.play.bind(this),
      exit: this.exit.bind(this),
    });
  }

  start() {
    this.view.start();
  }

  play(players, rounds = 3, time = 60) {
    // Create a new game instance
    this.game = new this.model({
      players, rounds, time
    });

    this.view.newGame(this.game);

    // Advance to the first round
    this.advanceRound();
  }

  advanceRound() {
    const gameState = this.game.nextRound();
    if(gameState.gameOver) {
      this.view.gameOver(gameState);
    } else {
      this.view.newRound(this.game);
      this.startTurn();
    }
  }

  startTurn() {
    this.view.playerTurn(this.game, {
      playWord: this.game.playWord.bind(this.game),
      endTurn: this.endTurn.bind(this),
    });
  }

  endTurn() {
    // Advance to next player
    const roundState = this.game.nextTurn();
    const callback = (roundState.roundOver
                       ? this.advanceRound
                       : this.startTurn).bind(this);

    return { roundState, callback };
  }

  exit() {
    this.view.exit();
    process.exit();
  }
}

export default Controller;
