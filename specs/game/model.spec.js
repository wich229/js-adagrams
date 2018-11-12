import Model from 'game/model';

describe('Game Model', () => {
  const config = {
    players: [
      'Player A',
      'Player B',
    ],
    rounds: 3,
    time: 60, // Seconds
  };

  describe('constructor', () => {
    it('creates a new Model instance', () => {
      const model = new Model(config);

      expect(model).toBeInstanceOf(Model);
    });

    it('requires a config parameter', () => {
      expect(() => {
        const model = new Model();
      }).toThrow(/config/);
    });

    it('initializes the round number to zero', () => {
      const model = new Model(config);

      expect(model.round).toBe(0);
    });

    it('initializes the current player to null', () => {
      const model = new Model(config);

      expect(model.currentPlayer).toBe(null);
    });

    it('initializes the letter bank to null', () => {
      const model = new Model(config);

      expect(model.letterBank).toBe(null);
    });

    it('initializes the plays history', () => {
      const model = new Model(config);

      expect(model.plays).toBeInstanceOf(Object);
      config.players.forEach((player) => {
        expect(model.plays).toHaveProperty(player);
        expect(model.plays[player]).toBeInstanceOf(Array);
        expect(model.plays[player]).toHaveLength(0);
      });
    });
  });


  describe('.nextRound', () => {
    it('is defined', () => {
      const model = new Model(config);

      expect(model.nextRound).toBeDefined();
    });

    it('increments the round number', () => {
      const model = new Model(config);
      const roundBefore = model.round;

      model.nextRound();

      expect(model.round).toBe(roundBefore + 1);
    });

    it('initializes the current player number to first player', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.currentPlayer).toBe(0);
    });

    it('draws a new hand of letters', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.letterBank).toBeInstanceOf(Array);
      expect(model.letterBank).toHaveLength(10);
      model.letterBank.forEach((letter) => {
        expect(letter).toMatch(/^[A-Z]$/);
      });
    });
  });

  describe('.playWord', () => {
    const getModel = () => {
      const model = new Model(config);
      model.nextRound();

      return model;
    };

    it('is defined', () => {
      const model = getModel();

      expect(model.playWord).toBeDefined();
    });
  });
});
