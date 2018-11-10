class Model {
  constructor(config) {
    if(!config) {
      throw new Error('Model requires a config parameter.');
    }

    this.config = config;

    // Initialize game state
    this.round = 0;
  }
}

export default Model;
