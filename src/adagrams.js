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

// const LETTER_SCORE = {
//   1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
//   2: ["D", "G"],
//   3: ["B", "C", "M", "P"],
//   4: ["F", "H", "V", "W", "Y"],
//   5: "K",
//   8: ["J", "X"],
//   10: ["Q", "Z"],
// };

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
  // const copy_pool = structuredClone(LETTER_POOL); #not able to use deep copy
  const copy_pool = { ...LETTER_POOL };
  let random_ten_letters = [];
  const keys_arr = Object.keys(copy_pool);

  let random_key;
  while (random_ten_letters.length < 10) {
    random_key = keys_arr[Math.floor(Math.random() * keys_arr.length)];
    if (copy_pool[random_key] > 0) {
      random_ten_letters.push(random_key);
      copy_pool[random_key] -= 1;
    } else if (copy_pool[random_key] === 0) {
      continue;
    }
  }
  return random_ten_letters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const input_arr = input.split("");
  if (input_arr.length > lettersInHand.length) {
    return false;
  }

  for (let i = 0; i < input_arr.length; ++i) {
    if (lettersInHand.includes(input_arr[i]) === false) {
      return false;
    }
    let index = lettersInHand.indexOf(input_arr[i]);
    lettersInHand.splice(index, index + 1);
  }
  return true;
};

export const scoreWord = (word) => {
  // if word is empty str return 0
  if (word === "") return 0;

  word = word.toUpperCase();
  let total = 0;
  let keys_arr = Object.keys(LETTER_SCORE);

  for (let i = 0; i < word.length; ++i) {
    for (let j = 0; j < keys_arr.length; ++j) {
      if (keys_arr[j].indexOf(word[i]) !== -1) {
        total += LETTER_SCORE[keys_arr[j]];
      }
    }
  }

  if (word.length >= 7) {
    total += 8;
  }
  return total;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
