import Util from './util.js';

export default {
    getNextFromBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    return [i, j];
                }
            }
        }
    }
}