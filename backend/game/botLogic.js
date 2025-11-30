const { createBoard, getDropRow, checkWin, ROWS, COLS } = require('./gameLogic');

class BotLogic {
  static getBestMove(board, botVal) {
    const opponentVal = botVal === 1 ? 2 : 1;
    const validMoves = this.getValidMoves(board);

    for (const col of validMoves) {
      if (this.canConnectFour(board, col, botVal)) return col;
    }

    for (const col of validMoves) {
      if (this.canConnectFour(board, col, opponentVal)) return col;
    }

    if (validMoves.includes(3)) return 3;

    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  static getValidMoves(board) {
    const moves = [];
    for (let c = 0; c < COLS; c++) {
      if (board[0][c] === 0) moves.push(c);
    }
    return moves;
  }

  static canConnectFour(board, col, playerVal) {
    const tempBoard = board.map(row => [...row]);
    const row = getDropRow(tempBoard, col);
    if (row === null) return false;
    tempBoard[row][col] = playerVal;
    return checkWin(tempBoard, row, col, playerVal);
  }
}

module.exports = BotLogic;