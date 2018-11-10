import Vorpal from 'vorpal';
import MESSAGES from 'game/messages.json';

const menu = new Vorpal();

const View = {
  start(play, exit) {
    menu.log(MESSAGES.intro);
  },
};

export default View;
