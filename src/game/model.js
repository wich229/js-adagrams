import Adagrams from 'game/adagrams';

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

    // Draw the letter bank
    this.letterBank = Adagrams.drawLetters();

    // Initialize player history for this round
    this.config.players.forEach((player) => {
      this.plays[player][this.round - 1] = [];
    });
  }

  nextTurn() {
    this.currentPlayer++;
  }

  playWord(word) {
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
}

export default Model;
