import Util from './util.js';

let board = [];

const getMoveIfCellMaxIARForPlayerWouldBeAtleast = (i, j, player, count) => {
    board[i][j] = player;
    const maxIAR = Util.cellMaxIAR(board, i, j);
    board[i][j] = 0;

    if (count <= maxIAR) {
        return [i, j];
    } else {
        return false;
    }
};

export default {
    nextMove(_board) {
        board = _board.slice(); //clones the array and returns the reference to the new array
        let move = null;

        // Get 5
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,2,5);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Stop 5 (or more) in a row / Book-end four or more
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,1,5);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Get 4 in a row
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,2,4);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Stop 4 (or more) in a row / Book-end three or more
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,1,4);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Stop 3 / Book-end two
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,1,3);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Adjacent
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    const newMove = getMoveIfCellMaxIARForPlayerWouldBeAtleast(i,j,1,2);
                    if (newMove) {
                        move = newMove
                    }
                }
            }
        }
        if (move) {
            return move;
        }

        // Next available
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    move = [i, j];
                }
            }
        }
        if (move) {
            return move;
        }
    }
}