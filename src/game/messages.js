export default {
  intro: 'Welcome to Adagrams!',
  exit: 'Thank you for playing Adagrams!',

  newGame: 'Starting a new game of Adagrams...',
  newRound: (curr, total) => `Round ${curr} of ${total}:`,
  playWordSuccess: (word, score) => `Played ${word} for ${score} points.`,
  playWordFailure: (word) => `Invalid word: ${word}.`,
  roundOver: (winner) => `Round over! The winner of this round is ${winner.player} who got ${winner.word} for ${winner.score} points!`,
  gameOver: (winner) => `Game over! Our winner is.... ${winner.player} with a total score of ${winner.score}!`,
};
