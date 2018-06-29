import Util from './util.js';

export default {
    nextMove(board) {
        //@todo work with copy, not the actual board

        // First Priority
        // Get 5
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 2;
                    const maxIAR = Util.cellMaxIAR(board, i, j);
                    board[i][j] = 0;

                    if (5 <= maxIAR) {
                        return [i, j];
                    }
                }
            }
        }

        // Second Priority
        // Stop five (or more) in a row / Book-end four or more
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 1;
                    const maxIAR = Util.cellMaxIAR(board, i, j);
                    board[i][j] = 0;

                    if (5 <= maxIAR) {
                        return [i, j];
                    }
                }
            }
        }

        // Third Priority
        // Stop four (or more) in a row / Book-end three or more
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 1;
                    const maxIAR = Util.cellMaxIAR(board, i, j);
                    board[i][j] = 0;

                    if (4 <= maxIAR) {
                        return [i, j];
                    }
                }
            }
        }

        // Fourth Priority
        // Get 4 in a row
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 2;
                    const maxIAR = Util.cellMaxIAR(board, i, j);
                    board[i][j] = 0;

                    if (4 <= maxIAR) {
                        return [i, j];
                    }
                }
            }
        }

        // Fifth Priority
        // Stop three / Book-end two
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 1;
                    const maxIAR = Util.cellMaxIAR(board, i, j);
                    board[i][j] = 0;

                    if (3 <= maxIAR) {
                        return [i, j];
                    }
                }
            }
        }

        // Default
        // Next available
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    return [i, j];
                }
            }
        }
    }
}