import Game from './game.js';
import View from './view.js';

Game.init();

const attemptMove = (i, j) => {
    i = parseInt(i);
    j = parseInt(j);

    if (Game.move(i, j)) {
        View.update(Game.previousMove, Game.gameOver);

        Game.step();
        View.update(Game.previousMove, Game.gameOver);
    }
};

View.init(attemptMove, Game);

window.onload = (() => {
    View.start(document.getElementById('game'));
});