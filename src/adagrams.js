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
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
