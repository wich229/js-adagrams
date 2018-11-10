class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.init({
      exit: this.exit.bind(this),
    });
  }

  start() {
    this.view.start();
  }

  exit() {
    this.view.exit();
    process.exit();
  }
}

export default Controller;
