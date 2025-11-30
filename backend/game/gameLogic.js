const ROWS = 6;
const COLS = 7;

const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const getDropRow = (board, col) => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) return row;
  }
  return null;
};

const checkWin = (board, r, c, playerVal) => {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

  for (const [dr, dc] of directions) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== playerVal) break;
      count++;
    }

    for (let i = 1; i < 4; i++) {
      const nr = r - dr * i;
      const nc = c - dc * i;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== playerVal) break;
      count++;
    }

    if (count >= 4) return true;
  }
  return false;
};

const checkDraw = (board) => {
  return board[0].every(cell => cell !== 0);
};

module.exports = { createBoard, getDropRow, checkWin, checkDraw, ROWS, COLS };