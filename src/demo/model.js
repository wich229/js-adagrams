import Adagrams from 'demo/adagrams';

class Model {
  constructor(config) {
    if(!config) {
      throw new Error('Model requires a config parameter.');
    }

    this.config = config;

    // Initialize game state
    this.round = 0;
    this.currentPlayer = null;
    this.letterBank = null;

    /* Plays history structure is:
        {
          playerOne: [
            ["APPLE", "PAPA", "LEAP"],    // round 1
            ["WALK", "WALKER", "RAKE"],   // round 2
          ],

          playerTwo: [
            ["PALE", "PELT"],             // round 1
            ["REAL", "WALTER", "TALKER"], // round 2
          ],
        }
    */
    this.plays = this.config.players.reduce((plays, player) => {
      plays[player] = [];
      return plays;
    }, {});
  }

  currentPlayerName() {
    if(this.currentPlayer === null) return null;

    return this._playerName(this.currentPlayer);
  }

  // Start the next round of the game
  nextRound() {
    this.round++;
    this.currentPlayer = 0;

    const gameOver = this.round > this.config.rounds;
    if(gameOver) {
      return { gameOver, winner: this._gameWinner() };
    }

    // Draw the letter bank
    this.letterBank = Adagrams.drawLetters();

    // Initialize player history for this round
    this.config.players.forEach((player) => {
      this.plays[player][this.round - 1] = [];
    });

    return { gameOver, winner: null };
  }

  nextTurn() {
    this.currentPlayer++;

    const roundOver = this.currentPlayer >= this.config.players.length;
    const winner = !roundOver ? null : this._roundWinner(this.round);

    return { roundOver, winner };
  }

  playWord(word) {
    word = word.toUpperCase();

    if(!this._valid(word)) return null;

    this._recordPlay(word);

    return Adagrams.scoreWord(word);
  }

  _valid(word, letterBank = this.letterBank) {
    if(word.length < 1) return false;
    return Adagrams.usesAvailableLetters(word, letterBank);
  }

  _playerName(player) {
    return this.config.players[player];
  }

  _recordPlay(word, player = this.currentPlayer, round = this.round) {
    this.plays[this._playerName(player)][round - 1].push(word);
  }

  _bestPlay(round, player) {
    const plays = this.plays[player][round - 1];
    if(plays.length < 1) {
      return null;
    }

    return Adagrams.highestScoreFrom(plays);
  }

  _roundWinner(round) {
    const bestPlays = this.config.players
                        .map((player) => ({ player, ...this._bestPlay(round, player) }))
                        .filter(({ player, word, score }) => word !== undefined);

    if(bestPlays.length < 1) {
      return { player: '<NOBODY>', word: '<NONE>', score: 0 };
    }

    const { word: winningWord } = Adagrams.highestScoreFrom(bestPlays.map(({ word }) => word));
    return bestPlays.find(({ word }) => word === winningWord);
  }

  _gameWinner() {
    // Add up the scores for each player, counting only the rounds where they won
    const roundWinners = [];
    for(let round = 1; round <= this.config.rounds; round++) {
      const winner = this._roundWinner(round);
      const existing = roundWinners.find(({ player }) => player === winner.player);

      if(existing) {
        existing.score += winner.score;
      } else {
        roundWinners.push(winner);
      }
    }

    return roundWinners.reduce((gameWinner, roundWinner) => {
      if(roundWinner.score > gameWinner.score) {
        gameWinner = roundWinner;
      }

      return gameWinner;
    }, { player: '<NOBODY>', score: 0 });
  }
}

export default Model;
