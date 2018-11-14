import Model from 'game/model';
import View from 'game/view';
import Controller from 'game/controller';

// Initialize the controller I guess
const game = new Controller(Model, View);
game.start();
