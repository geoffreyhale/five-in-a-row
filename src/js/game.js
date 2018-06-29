export default {
    board: [],
    gameOver: false,
    lastMove: null,
    playerTurn: 1, //player 1 or 2

    init(Config) {
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
    }
}