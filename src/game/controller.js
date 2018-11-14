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
  }

  exit() {
    this.view.exit();
    process.exit();
  }
}

export default Controller;
