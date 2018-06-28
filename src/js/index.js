/**
 * Config
 */
const boardWidth = 8;
const boardHeight = 12;

/**
 * Initialize Board
 *
 * 0 - empty
 * 1 - player 1
 * 2 - player 2
 */
const getBoardSymbol = (p) => {
    switch (p) {
        case 0:
            return '';
            break;
        case 1:
            return 'x';
            break;
        case 2:
            return 'o';
            break;
        default:
            return '?';
    }
};

let board = [];
for (let i = 0; i < boardHeight; i++) {
    board[i] = [];
    for (let j = 0; j < boardWidth; j++) {
        board[i][j] = 0;
    }
}

const boardCellElements = [];
for (let i = 0; i < boardHeight; i++) {
    boardCellElements[i] = [];
    for (let j = 0; j < boardWidth; j++) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('data-i', i.toString());
        cellElement.setAttribute('data-j', j.toString());
        boardCellElements[i][j] = cellElement;
    }
}

const boardElement = document.createElement('table');
const boardElementBody = boardElement.appendChild(document.createElement('tbody'));
for (let i = 0; i < boardHeight; i++) {
    const boardRow = boardElementBody.appendChild(document.createElement('tr'));
    for (let j = 0; j < boardWidth; j++) {
        boardRow.appendChild(boardCellElements[i][j]);
    }
}

const updateBoard = (i, j, playerTurn) => {
    board[i][j] = playerTurn;
    boardCellElements[i][j].innerText = getBoardSymbol(board[i][j]);
    boardCellElements[i][j].style.color = 'black';
};

let playerTurn = 1; //player 1 or 2
const cellClick = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        updateBoard(i, j, playerTurn);
        checkBoardForFiveInARow(i, j);

        if (playerTurn == 1) { playerTurn = 2 }
        else if (playerTurn == 2) { playerTurn = 1 }
    }
};
const cellMouseover = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        e.srcElement.innerText = getBoardSymbol(playerTurn);
        e.srcElement.style.color = 'lightgrey';
    }
};
const cellMouseout = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        e.srcElement.innerText = '';
    }
};

function hasConsecutive(arr, amount) {
    var last = null;
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != last) {
            last = arr[i];
            count = 0;
        }
        count += 1;
        if (amount <= count) {
            return true;
        }
    }
    return false;
}
const checkBoardForFiveInARow = (i, j) => {
    i = parseInt(i);
    j = parseInt(j);
    const series = {
        horizontal: [[i,j-4],[i,j-3],[i,j-2],[i,j-1],[i,j],[i,j+1],[i,j+2],[i,j+3],[i,j+4]],
        vertical: [[i-4,j],[i-3,j],[i-2,j],[i-1,j],[i,j],[i+1,j],[i+2,j],[i+3,j],[i+4,j]],
        nw: [[i-4,j-4],[i-3,j-3],[i-2,j-2],[i-1,j-1],[i,j],[i+1,j+1],[i+2,j+2],[i+3,j+3],[i+4,j+4]],
        ne: [[i-4,j+4],[i-3,j+3],[i-2,j+2],[i-1,j+1],[i,j],[i+1,j-1],[i+2,j-2],[i+3,j-3],[i+4,j-4]],
    };
    for (let seriesName in series) {
        const offBoardIndexesToRemoveFromSeries = [];
        // find out of range indexes
        for (let n = 0; n < series[seriesName].length; n++) {
            if (
                series[seriesName][n][0] < 0
                || series[seriesName][n][0] > boardHeight - 1
                || series[seriesName][n][1] < 0
                || series[seriesName][n][1] > boardWidth - 1
            ) {
                offBoardIndexesToRemoveFromSeries.push(n);
            }
        }
        // remove out of range indexes
        for (let m = offBoardIndexesToRemoveFromSeries.length - 1; m >= 0; m--) {
            series[seriesName].splice(offBoardIndexesToRemoveFromSeries[m],1);
        }
        const seriesBoardValues = [];
        for (let p = 0; p < series[seriesName].length; p++) {
            seriesBoardValues.push(
                board[
                    series[seriesName][p][0]
                    ][
                    series[seriesName][p][1]
                    ]
            );
        }
        if (hasConsecutive(seriesBoardValues, 5)) {
            console.log('Five in a row!');
            document.body.style.background = 'grey';
        }
    }
};

window.onload = (() => {
    document.getElementById('game').appendChild(boardElement);

    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener("click", cellClick);
        tds[i].addEventListener("mouseover", cellMouseover);
        tds[i].addEventListener("mouseout", cellMouseout);
    }
});