// import {
//   drawLetters,
//   usesAvailableLetters,
//   scoreWord,
//   highestScoreFrom,
// } from "adagrams";

import Adagrams from "adagrams";
const adagrams = new Adagrams();
const Real = {
  drawLetters: adagrams.drawLetters(),
  usesAvailableLetters: adagrams.usesAvailableLetters(),
  scoreWord: adagrams.scoreWord(),
  highestScoreFrom: adagrams.highestScoreFrom(),
  LETTER_POOL: adagrams.LETTER_POOL,
};

// const LETTER_POOL = {
//   A: 9,
//   B: 2,
//   C: 2,
//   D: 4,
//   E: 12,
//   F: 2,
//   G: 3,
//   H: 2,
//   I: 9,
//   J: 1,
//   K: 1,
//   L: 4,
//   M: 2,
//   N: 6,
//   O: 8,
//   P: 2,
//   Q: 1,
//   R: 6,
//   S: 4,
//   T: 6,
//   U: 4,
//   V: 2,
//   W: 2,
//   X: 1,
//   Y: 2,
//   Z: 1,
// };

describe("Adagrams", () => {
  describe("drawLetters", () => {
    it("draws ten letters from the letter pool", () => {
      //Act
      const drawn = Real.drawLetters();

      //Assert
      expect(drawn).toHaveLength(10);
    });

    it("returns an array, and each item is a single-letter string", () => {
      //Act
      const drawn = Real.drawLetters();

      //Assert
      expect(Array.isArray(drawn)).toBe(true);
      drawn.forEach((l) => {
        expect(l).toMatch(/^[A-Z]$/);
      });
    });

    it("does not draw a letter too many times", () => {
      //Act
      for (let i = 0; i < 1000; i++) {
        const drawn = Real.drawLetters();
        const letter_freq = {};
        for (let letter of drawn) {
          if (letter in letter_freq) {
            letter_freq[letter] += 1;
          } else {
            letter_freq[letter] = 1;
          }
        }

        //Assert
        for (let letter of drawn) {
          expect(letter_freq[letter]).toBeLessThanOrEqual(LETTER_POOL[letter]);
        }
      }
    });
  });

  describe("usesAvailableLetters", () => {
    it("returns true if the submitted letters are valid against the drawn letters", () => {
      const drawn = ["D", "O", "G", "X", "X", "X", "X", "X", "X", "X"];
      const word = "DOG";

      const isValid = Real.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(true);
    });

    it("returns false when word contains letters not in the drawn letters", () => {
      const drawn = ["D", "O", "X", "X", "X", "X", "X", "X", "X", "X"];
      const word = "DOG";

      const isValid = Real.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(false);
    });

    it("returns false when word contains repeated letters more than in the drawn letters", () => {
      const drawn = ["D", "O", "G", "X", "X", "X", "X", "X", "X", "X"];
      const word = "GOOD";

      const isValid = Real.usesAvailableLetters(word, drawn);
      expect(isValid).toBe(false);
    });
  });

  describe("scoreWord", () => {
    const expectScores = (wordScores) => {
      Object.entries(wordScores).forEach(([word, score]) => {
        expect(Real.scoreWord(word)).toBe(score);
      });
    };

    it("returns an accurate numerical score according to the score chart", () => {
      expectScores({
        A: 1,
        DOG: 5,
        WHIMSY: 17,
      });
    });

    it("returns a score regardless of the input case", () => {
      expectScores({
        a: 1,
        dog: 5,
        wHiMsY: 17,
      });
    });

    it("returns a score of 0 if given an empty input", () => {
      expectScores({
        "": 0,
      });
    });

    it("adds an extra 8 points if word is 7 or more characters long", () => {
      expectScores({
        XXXXXXX: 64,
        XXXXXXXX: 72,
        XXXXXXXXX: 80,
        XXXXXXXXXX: 88,
      });
    });
  });

  describe("highestScoreFrom", () => {
    it("returns a hash that contains the word and score of best word in an array", () => {
      const words = ["a", "DOG", "king", "Quit"];
      const correct = { word: "Quit", score: Real.scoreWord("Quit") };

      expect(Real.highestScoreFrom(words)).toEqual(correct);
    });

    it("accurately finds best scoring word even if not sorted", () => {
      const words = ["king", "Quantizers", "a", "DOG"];
      const correct = {
        word: "Quantizers",
        score: Real.scoreWord("Quantizers"),
      };

      expect(Real.highestScoreFrom(words)).toEqual(correct);
    });

    describe("in case of tied score", () => {
      const expectTie = (words) => {
        const scores = words.map((word) => Real.scoreWord(word));
        const highScore = scores.reduce((h, s) => (h < s ? s : h), 0);
        const tiedWords = scores.filter((s) => s == highScore);

        // Expect at least two tied words
        expect(tiedWords.length).toBeGreaterThan(1);
      };

      it("selects the word with 10 letters", () => {
        const words = ["AAAAAAAAAA", "BBBBBB"];
        const correct = {
          word: "AAAAAAAAAA",
          score: Real.scoreWord("AAAAAAAAAA"),
        };
        expectTie(words);

        expect(Real.highestScoreFrom(words)).toEqual(correct);
        expect(Real.highestScoreFrom(words.reverse())).toEqual(correct);
      });

      it("selects the word with fewer letters when neither are 10 letters", () => {
        const words = ["MMMM", "WWW"];
        const correct = { word: "WWW", score: Real.scoreWord("WWW") };
        expectTie(words);

        expect(Real.highestScoreFrom(words)).toEqual(correct);
        expect(Real.highestScoreFrom(words.reverse())).toEqual(correct);
      });

      it("selects the first word when both have same length", () => {
        const words = ["AAAAAAAAAA", "EEEEEEEEEE"];
        const first = {
          word: "AAAAAAAAAA",
          score: Real.scoreWord("AAAAAAAAAA"),
        };
        const second = {
          word: "EEEEEEEEEE",
          score: Real.scoreWord("EEEEEEEEEE"),
        };
        expectTie(words);

        expect(Real.highestScoreFrom(words)).toEqual(first);
        expect(Real.highestScoreFrom(words.reverse())).toEqual(second);
      });
    });
  });
});
