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
});
