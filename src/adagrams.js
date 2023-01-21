// class Adagrams {
//   constructor() {
//     this.input = input;
//     this.lettersInHand = [];
//     this.
//   }

//  const LETTER_POOL
//  const LETTER_POOL

//  drawLetters()
//  usesAvailableLetters(input, lettersInHand)
//  scoreWord (word)
//  highestScoreFrom (words)

// }

const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const LETTER_SCORE = {
  AEIOUNRST: 1,
  DG: 2,
  BCMP: 3,
  FHVWY: 4,
  K: 5,
  JX: 8,
  QZ: 10,
};

export const drawLetters = () => {
  // # not sure why not be able to use deep copy.
  // const copy_pool = structuredClone(LETTER_POOL);
  const copyPool = { ...LETTER_POOL };
  let lettersInHand = [];
  const keysArr = Object.keys(copyPool);

  let randomKey;
  while (lettersInHand.length < 10) {
    randomKey = keysArr[Math.floor(Math.random() * keysArr.length)];
    if (copyPool[randomKey] > 0) {
      lettersInHand.push(randomKey);
      copyPool[randomKey] -= 1;
    }
  }
  return lettersInHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const inputArr = input.split("");
  if (inputArr.length > lettersInHand.length) {
    return false;
  }

  for (let i = 0; i < inputArr.length; ++i) {
    if (lettersInHand.includes(inputArr[i]) === false) {
      return false;
    }
    let index = lettersInHand.indexOf(inputArr[i]);
    lettersInHand.splice(index, index + 1);
  }
  return true;
};

export const scoreWord = (word) => {
  // if word is empty str return 0
  if (word === "") return 0;

  word = word.toUpperCase();
  let total = 0;
  let keysArr = Object.keys(LETTER_SCORE);

  for (let i = 0; i < word.length; ++i) {
    for (let j = 0; j < keysArr.length; ++j) {
      if (keysArr[j].indexOf(word[i]) !== -1) {
        total += LETTER_SCORE[keysArr[j]];
      }
    }
  }

  if (word.length >= 7) {
    total += 8;
  }
  return total;
};

export const highestScoreFrom = (words) => {
  let words_socres_Obj = {};
  let maxScore = 0;

  // find each word's score and the max score
  for (let i = 0; i < words.length; ++i) {
    let eachScore = scoreWord(words[i]);
    words_socres_Obj[words[i]] = eachScore;
    if (eachScore > maxScore) maxScore = eachScore;
  }

  // loop through the words_socres_obj to get the sames max score words
  for (let eachWord in words_socres_Obj) {
    if (words_socres_Obj[eachWord] !== maxScore) {
      delete words_socres_Obj[eachWord];
    }
  }

  let result = { word: "", score: 0 };

  if (Object.keys(words_socres_Obj).length > 1) {
    let wordsArr = Object.keys(words_socres_Obj);
    let wordsLengthArr = wordsArr.map((word) => word.length);
    let minLengh = Math.min(...wordsLengthArr);

    // if the words is 10 letters => choose the 10 letters (find)
    if (wordsArr.find((word) => word.length === 10) !== undefined) {
      let tenLettersWord = wordsArr.find((word) => word.length === 10);
      result.word = tenLettersWord;
      result.score = words_socres_Obj[tenLettersWord];
      return result;
    }
    // if words different length => pick the shortest word (min)
    // if words in same length => pick the first (if all the same min will retrun the only num)
    let minOrfirstWord = wordsArr.find((word) => word.length === minLengh);
    result.word = minOrfirstWord;
    result.score = words_socres_Obj[minOrfirstWord];
    return result;
  } else {
    result.word = Object.keys(words_socres_Obj)[0];
    result.score = Object.values(words_socres_Obj)[0];
    return result;
  }
};

// export default Adagrams
