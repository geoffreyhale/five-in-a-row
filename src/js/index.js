import AI from './ai.js';
import Config from './config.js';
import Game from './game.js';
import UI from './ui.js';
import Util from './util.js';

Game.init(Config);

const updateBoard = (i, j) => {
    i = parseInt(i);
    j = parseInt(j);

    Game.board[i][j] = Game.playerTurn;
    UI.boardCellElements[i][j].innerText = Util.getBoardSymbol(Game.board[i][j]);
    UI.boardCellElements[i][j].style.color = 'black';

    if (Util.cellIsFIAR(Game.board, i, j)) {
        UI.boardCellElements[i][j].style.background = Config.COLOR_WIN;
        Game.gameOver = true;
    }
};

const processValidMove = (i, j) => {
    updateBoard(i, j);

    Game.nextPlayerTurn();

    //@todo this doesn't belong here
    if (Config.USE_COMPUTER_OPPONENT) {
        const [i,j] = AI.getNextFromBoard(Game.board);
        updateBoard(i, j);

        Game.nextPlayerTurn();
    }
};

const attemptMove = (i, j) => {
    if (Game.moveIsValid(i,j)) {
        processValidMove(i, j);
    }
};

UI.init(Config, Game, attemptMove);

window.onload = (() => {
    UI.start(document.getElementById('game'));
});