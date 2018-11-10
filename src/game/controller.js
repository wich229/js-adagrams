class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.init();
  }

  start() {
    this.view.start();
  }
}

export default Controller;
