import Model from 'game/model';

describe('Game Model', () => {
  const config = {};

  describe('constructor', () => {
    it('creates a new Model instance', () => {
      const model = new Model(config);

      expect(model).toBeInstanceOf(Model);
    });
  });
});
