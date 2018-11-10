import Vorpal from 'vorpal';
import MESSAGES from 'game/messages.json';

const menu = new Vorpal();

const View = {
  start(play, exit) {
    menu.log(MESSAGES.intro);

    menu.show();
  },

  play() {
    menu.log(MESSAGES.play);
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

        callbacks.play(numPlayers, rounds, time);
        done();
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
