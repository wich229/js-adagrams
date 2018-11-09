import Adagrams from 'adagrams';

describe('Adagrams', () => {
  describe('drawLetters', () => {
    it('draws ten letters from the letter pool', () => {
      const drawn = Adagrams.drawLetters();

      expect(drawn).toHaveLength(10);
    });

    it('returns an array, and each item is a single-letter string', () => {
      const drawn = Adagrams.drawLetters();

      expect(Array.isArray(drawn)).toBe(true);
      drawn.forEach((l) => {
        expect(l).toMatch(/^[A-Z]$/);
      });
    });
  });

  describe('usesAvailableLetters', () => {
    it('returns true if the submitted letters are valid against the drawn letters', () => {
      const drawn = ['D', 'O', 'G', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
      const word = 'DOG';

      const isValid = Adagrams.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(true);
    });

    it('returns false when word contains letters not in the drawn letters', () => {
      const drawn = ['D', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
      const word = 'DOG';

      const isValid = Adagrams.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(false);
    });

    it('returns false when word contains repeated letters more than in the drawn letters', () => {
      const drawn = ['D', 'O', 'G', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
      const word = 'GOOD';

      const isValid = Adagrams.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(false);

    });
  });

  describe('scoreWord', () => {
    const expectScores = (wordScores) => {
      Object.entries(wordScores).forEach(([word, score]) => {
        expect(Adagrams.scoreWord(word)).toBe(score);
      });
    };

    it('returns an accurate numerical score according to the score chart', () => {
      expectScores({
        'A': 1,
        'DOG': 5,
        'WHIMSY': 17
      });
    });

    it('returns a score regardless of the input case', () => {
      expectScores({
        'a': 1,
        'dog': 5,
        'wHiMsY': 17
      });
    });

    it('returns a score of 0 if given an empty input', () => {
      expectScores({
        '': 0
      });
    });

    it('adds an extra 8 points if word is 7 or more characters long', () => {
      expectScores({
        'XXXXXXX': 64,
        'XXXXXXXX': 72,
        'XXXXXXXXX': 80,
        'XXXXXXXXXX': 88
      });
    });
  });
});
