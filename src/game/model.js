class Model {
  constructor(config) {
    if(!config) {
      throw new Error('Model requires a config parameter.');
    }

    this.config = config;
  }
}

export default Model;
