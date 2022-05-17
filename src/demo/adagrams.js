import {
  drawLetters,
  usesAvailableLetters,
  scoreWord,
  highestScoreFrom,
} from "adagrams";

const Real = {
  drawLetters,
  usesAvailableLetters,
  scoreWord,
  highestScoreFrom,
};

const Stub = {
  drawLetters() {
    const defaultLetters = ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"];

    if (typeof Real.drawLetters === "function") {
      return Real.drawLetters() || defaultLetters;
    }

    return defaultLetters;
  },

  usesAvailableLetters(input, lettersInHand) {
    if (typeof Real.usesAvailableLetters === "function") {
      return Real.usesAvailableLetters(input, lettersInHand);
    }

    return true;
  },

  scoreWord(word) {
    if (typeof Real.scoreWord === "function") {
      return Real.scoreWord(word);
    }

    return -1;
  },

  highestScoreFrom(words) {
    if (typeof Real.highestScoreFrom === "function") {
      return Real.highestScoreFrom(words);
    }

    if (words.length < 1) return null;

    return {
      word: words[0],
      score: Stub.scoreWord(words[0]),
    };
  },
};

export default Stub;
