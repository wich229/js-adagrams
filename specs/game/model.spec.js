import Model from 'game/model';
import Adagrams from 'game/adagrams';

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

  describe('.currentPlayerName()', () => {
    it('is defined', () => {
      const model = new Model(config);

      expect(model.currentPlayerName).toBeDefined();
    });

    it('returns the name of the current player when game is on-going', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.currentPlayerName()).toEqual(model.config.players[0]);
    });

    it('returns null when the game is not on-going', () => {
      const model = new Model(config);

      expect(model.currentPlayerName()).toBe(null);
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

    it('initializes the round play history for first player', () => {
      const model = new Model(config);

      model.nextRound();

      config.players.forEach((player) => {
        const roundPlays = model.plays[player][model.round - 1];

        expect(roundPlays).toBeInstanceOf(Array);
        expect(roundPlays).toHaveLength(0);
      });
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

  describe('.nextTurn', () => {
    const getModel = () => {
      const model = new Model(config);
      model.nextRound();

      return model;
    };

    it('is defined', () => {
      const model = getModel();

      expect(model.nextTurn).toBeDefined();
    });

    it('increments the current player index', () => {
      const model = getModel();
      const origPlayer = model.currentPlayer;

      model.nextTurn();
      expect(model.currentPlayer).toBe(origPlayer + 1);

      model.nextTurn();
      expect(model.currentPlayer).toBe(origPlayer + 2);
    });

    describe('returns round state', () => {
      it('roundOver', () => {
        const model = getModel();

        const roundState = model.nextTurn();

        // Expect that we have at least two players, or round is over immediately
        expect(config.players.length).toBeGreaterThan(1);

        expect(roundState).toBeInstanceOf(Object);
        expect(roundState).toHaveProperty('roundOver');
        expect(roundState.roundOver).toBe(false);

        // Advance to the final turn
        config.players.slice(2).forEach(() => {
          model.nextTurn();
        });

        // Complete the final turn, round should be over
        const roundOverState = model.nextTurn();
        expect(roundOverState.roundOver).toBe(true);
      });
    });
  });

  describe('.playWord', () => {
    const getModel = () => {
      const model = new Model(config);
      model.nextRound();

      return model;
    };

    const getPlays = (model, player, round) => {
      return [...(model.plays[player][round - 1] || [])];
    };

    it('is defined', () => {
      const model = getModel();

      expect(model.playWord).toBeDefined();
    });

    describe('for valid words', () => {
      const getWord = (model) => {
        return model.letterBank.slice(0, 5).join('');
      };

      it('it returns the word score', () => {
        const model = getModel();
        const word = getWord(model);
        const score = Adagrams.scoreWord(word);

        expect(model.playWord(word)).toBe(score);
      });

      it('adds word to plays history for current player', () => {
        const model = getModel();
        const player = model.currentPlayerName();
        const origPlays = getPlays(model, player, model.round);

        const word1 = getWord(model);
        model.playWord(word1);
        expect(getPlays(model, player, model.round)).toEqual([...origPlays, word1]);

        const word2 = getWord(model);
        model.playWord(word2);
        expect(getPlays(model, player, model.round)).toEqual([...origPlays, word1, word2]);
      });
    });

    describe('for invalid words', () => {
      const getWord = (model) => {
        const letter = model.letterBank[0];
        return letter.repeat(model.letterBank.filter((l) => {
          return l === letter;
        }).length + 1);
      };

      it('it returns null', () => {
        const model = getModel();
        const word = getWord(model);

        expect(model.playWord(word)).toBe(null);
        expect(model.playWord('123')).toBe(null);
        expect(model.playWord('')).toBe(null);
      });

      it('does not add word to history', () => {
        const model = getModel();
        const word = getWord(model);
        const origPlays = {...model.plays};

        model.playWord(word);

        expect(model.plays).toEqual(origPlays);
      });
    });
  });
});
