import Vorpal from 'vorpal';
import MESSAGES from 'game/messages.json';

const menu = new Vorpal();

const View = {
  start(play, exit) {
    menu.log(MESSAGES.intro);

    menu.show();
  },

  exit() {
    menu.log(MESSAGES.exit);
  },

  init(callbacks) {
    menu.delimiter('Adagrams>');

    menu
      .find('exit')
      .action((_, done) => {
        callbacks.exit();
        done();
      });
  },
};

export default View;
