export default {
  intro: 'Welcome to Adagrams!',
  exit: 'Thank you for playing Adagrams!',

  play: 'Starting a new game of Adagrams...',
  playWordSuccess: (word, score) => `Played ${word} for ${score} points.`,
  playWordFailure: (word) => `Invalid word: ${word}.`,
};
