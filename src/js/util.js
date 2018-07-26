export default {
    /**
     * Cell (Is Part Of) Max In A Row
     *
     * Strategy:
     * 1. Count similar value consecutive adjacent cells in all 8 directions (starting North, cw)
     * 2. Sum count totals for all 4 directions (starting North, cw)
     */
    cellMaxIAR(board, i, j) {
        const minI = 0;
        const maxI = board.length - 1;
        const minJ = 0;
        const maxJ = board[0].length - 1; // warning: assumes rectangular

        const val = board[i][j];
        if (val == 0) {
            return 0;
        }

        const count = {n:0, ne:0, e:0, se:0, s:0, sw:0, w:0, nw:0};

        //North
        for (let n = 0; n < 5; n++) {
            if (i - n >= minI) {
                if (board[i-n][j] == val) {
                    count.n++;
                } else {
                    break;
                }
            }
        }
        //Northeast
        for (let n = 0; n < 5; n++) {
            if (i - n >= minI && j + n <= maxJ) {
                if (board[i-n][j+n] == val) {
                    count.ne++;
                } else {
                    break;
                }
            }
        }
        //East
        for (let n = 0; n < 5; n++) {
            if (j + n <= maxJ) {
                if (board[i][j+n] == val) {
                    count.e++;
                } else {
                    break;
                }
            }
        }
        //Southeast
        for (let n = 0; n < 5; n++) {
            if (i + n <= maxI && j + n <= maxJ) {
                if (board[i+n][j+n] == val) {
                    count.se++;
                } else {
                    break;
                }
            }
        }
        //South
        for (let n = 0; n < 5; n++) {
            if (i + n <= maxI) {
                if (board[i+n][j] == val) {
                    count.s++;
                } else {
                    break;
                }
            }
        }
        //Southwest
        for (let n = 0; n < 5; n++) {
            if (i + n <= maxI && j - n >= minJ) {
                if (board[i+n][j-n] == val) {
                    count.sw++;
                } else {
                    break;
                }
            }
        }
        //West
        for (let n = 0; n < 5; n++) {
            if (j - n >= minJ) {
                if (board[i][j-n] == val) {
                    count.w++;
                } else {
                    break;
                }
            }
        }
        //Northwest
        for (let n = 0; n < 5; n++) {
            if (i - n >= minI && j - n >= minJ) {
                if (board[i-n][j-n] == val) {
                    count.nw++;
                } else {
                    break;
                }
            }
        }

        return Math.max(
            count.n + count.s - 1,
            count.ne + count.sw - 1,
            count.e + count.w - 1,
            count.se + count.nw - 1
        );
    },

    /**
     * Cell Is (Part Of At Least) Five In A Row
     */
    cellIsFIAR (board, i, j) {
        return 5 <= this.cellMaxIAR(board, i, j);
    },
}