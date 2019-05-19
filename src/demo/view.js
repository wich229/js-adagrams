import Vorpal from 'vorpal';
import MESSAGES from 'demo/messages.js';

const menu = new Vorpal();

const View = {
  start(play, exit) {
    menu.log(MESSAGES.intro);

    menu.show();
  },

  newGame(model) {
    menu.log(MESSAGES.newGame);
  },

  newRound(model) {
    menu.log(MESSAGES.newRound(model.round, model.config.rounds));
  },

  playerTurn(model, callbacks) {
    const game = new Vorpal();
    game
      .delimiter('')
      .show();

    game.log(model.letterBank.join(' '));

    game
      .mode('playerTurn')
      .delimiter(`Now playing: ${model.currentPlayerName()}>`)
      .action((word, done) => {
        const result = callbacks.playWord(word);

        if(Number.isInteger(result)) {
          game.log(MESSAGES.playWordSuccess(word, result));
        } else {
          game.log(MESSAGES.playWordFailure(word));
        }

        done();
      });

    game.exec('playerTurn');

    // Player's turn is over when the mode exits
    game.on('mode_exit', () => {
      const {roundState, callback} = callbacks.endTurn();
      if(roundState.roundOver) {
        menu.log(MESSAGES.roundOver(roundState.winner));
        game.hide();
      }

      // In order to let this turn finish and the Vorpal object to get GC'd
      // we should enqueue the callback rather than run it now
      setTimeout(callback, 0);
    });
  },

  gameOver(gameState) {
    menu.log(MESSAGES.gameOver(gameState.winner));
    menu.show();
  },

  exit() {
    menu.log(MESSAGES.exit);
  },

  init(callbacks) {
    menu.delimiter('Adagrams>');

    menu
      .command('start [players]')
      .description('Play a game of Adagrams. ')
      .alias('play', 's', 'p')
      .option('-r, --rounds <n>', 'Number of rounds')
      .option('-t, --time <seconds>', 'Time for each round in seconds')
      .action((args, done) => {
        const numPlayers = args.players;
        const rounds = args.options.rounds;
        const time = args.options.time;

        // Player name selection
        const validName = (name) => /\w/.test(name.trim());

        let questions;
        if(!Number.isInteger(numPlayers) || numPlayers < 2) {
          // Default to a solo game
          questions = [{
            name: 'player0',
            message: 'Player Name: ',
            validate: validName
          }];
        } else {
          questions = [...Array(numPlayers).keys()].map((n) => ({
            name: `player${n}`,
            message: `Player ${n + 1} Name: `,
            validate: validName
          }));
        }

        menu.activeCommand.prompt(questions, (answers) => {
          const PROP_REGEX = /^player(\d+)$/;

          let playerNames =
            Object.entries(answers)
            .map(([prop, val]) => [PROP_REGEX.exec(prop), val.trim()])
            .filter(([match, val]) => !!match)
            .sort(([[_, leftNum]], [[__, rightNum]]) => Number(leftNum) - Number(rightNum))
            .map(([_, name]) => name);

          callbacks.play(playerNames, rounds, time);
          done();
        });
      });

    menu
      .find('exit')
      .action((_, done) => {
        callbacks.exit();
        done();
      });
  },
};

export default View;
