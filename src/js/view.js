import Config from './config.js';

const getBoardSymbol = (p) => {
    switch (p) {
        case 0: //empty
            return '';
            break;
        case 1: //player 1
            return 'x';
            break;
        case 2: //player 2
            return 'o';
            break;
        default:
            return '?';
    }
};

const boardCellElements = [];
for (let i = 0; i < Config.BOARD_HEIGHT; i++) {
    boardCellElements[i] = [];
    for (let j = 0; j < Config.BOARD_WIDTH; j++) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('data-i', i.toString());
        cellElement.setAttribute('data-j', j.toString());
        boardCellElements[i][j] = cellElement;
    }
}

const boardElement = document.createElement('table');
const boardElementBody = boardElement.appendChild(document.createElement('tbody'));
for (let i = 0; i < Config.BOARD_HEIGHT; i++) {
    const boardRow = boardElementBody.appendChild(document.createElement('tr'));
    for (let j = 0; j < Config.BOARD_WIDTH; j++) {
        boardRow.appendChild(boardCellElements[i][j]);
    }
}

export default {
    init(attemptMove, Game) {
        const cellClick = (e) => {
            const i = e.target.getAttribute('data-i');
            const j = e.target.getAttribute('data-j');
            attemptMove(i, j);
        };
        const cellMouseover = (e) => {
            const i = e.target.getAttribute('data-i');
            const j = e.target.getAttribute('data-j');

            if (Game.board[i][j] == 0) {
                e.target.innerText = getBoardSymbol(Game.playerTurn);
                e.target.style.color = 'lightgrey';
            }
        };
        const cellMouseout = (e) => {
            const i = e.target.getAttribute('data-i');
            const j = e.target.getAttribute('data-j');

            if (Game.board[i][j] == 0) {
                e.target.innerText = '';
            }
        };

        for (let i = 0; i < boardCellElements.length; i++) {
            for (let j = 0; j < boardCellElements[0].length; j++) {
                boardCellElements[i][j].addEventListener("click", cellClick);
                boardCellElements[i][j].addEventListener("mouseover", cellMouseover);
                boardCellElements[i][j].addEventListener("mouseout", cellMouseout);
            }
        }
    },

    start(el) {
        el.appendChild(boardElement);
    },

    update(move, gameOver) {
        const [i, j, player] = [move.i, move.j, move.player];
        boardCellElements[i][j].innerText = getBoardSymbol(player);
        boardCellElements[i][j].style.color = 'black';

        if (gameOver) {
            boardCellElements[i][j].style.background = Config.COLOR_WIN;
        }
    },
}
