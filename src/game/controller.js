class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.view.start();
  }
}

export default Controller;
