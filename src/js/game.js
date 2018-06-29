import AI from './ai.js';
import Config from './config.js';
import Util from './util.js';

export default {
    board: [],
    gameOver: false,
    previousMove: null, //1 or 2
    playerTurn: 1, //player 1 or 2

    init() {
        for (let i = 0; i < Config.BOARD_HEIGHT; i++) {
            this.board[i] = [];
            for (let j = 0; j < Config.BOARD_WIDTH; j++) {
                this.board[i][j] = 0;
            }
        }
    },

    moveIsValid(i, j) {
        return this.board[i][j] == 0;
    },

    nextPlayerTurn() {
        if (this.playerTurn == 1) {
            this.playerTurn = 2;
        }
        else if (this.playerTurn == 2) {
            this.playerTurn = 1;
        }
    },

    move(i, j) {
        if (!this.gameOver
            && this.moveIsValid(i,j)
        ) {
            this.board[i][j] = this.playerTurn;

            this.previousMove = {
                player: this.playerTurn,
                i: i,
                j: j,
            };

            if (Util.cellIsFIAR(this.board, i, j)) {
                this.gameOver = true;
            }

            this.nextPlayerTurn();

            return true; //success
        }
        return false;
    },

    step() {
        if (!this.gameOver
            && Config.USE_COMPUTER_OPPONENT
            && this.playerTurn == 2
        ) {
            const [i,j] = AI.nextMove(this.board);

            this.board[i][j] = this.playerTurn;

            this.previousMove = {
                player: this.playerTurn,
                i: i,
                j: j,
            };

            if (Util.cellIsFIAR(this.board, i, j)) {
                this.gameOver = true;
            }

            this.nextPlayerTurn();

            this.step();
        }
    },
}