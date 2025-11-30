 const { createBoard, getDropRow, checkWin, checkDraw } = require('./gameLogic');
const Game = require('../models/Game');
const BotLogic = require('./botLogic');

class GameRoom {
  constructor(gameId, io, p1, p2) {
    this.gameId = gameId;
    this.io = io;
    this.p1 = p1;
    this.p2 = p2;
    this.timers = {};

    this.state = {
      gameId: gameId,
      board: createBoard(),
      currentPlayer: p1.username,
      status: 'IN_PROGRESS',
      winner: null,
      players: { p1, p2 }
    };
  }

  makeMove(username, col) {
    console.log(`👉 Move Request: ${username} at Col ${col}`);
    console.log(`   Current Turn: ${this.state.currentPlayer}`);
    console.log(`   Status: ${this.state.status}`);

    if (this.state.status !== 'IN_PROGRESS') {
        console.log(`❌ Game not in progress`);
        return;
    }
    
    if (this.state.currentPlayer !== username) {
        console.log(`⚠️ Wrong Turn! Expected: ${this.state.currentPlayer}, Got: ${username}`);
        return;
    }

    const playerVal = username === this.p1.username ? 1 : 2;
    console.log(`   Player Value: ${playerVal} (1=Red, 2=Yellow)`);
    
    const row = getDropRow(this.state.board, col);

    if (row === null) {
        console.log(`❌ Column ${col} is full!`);
        return;
    }

    this.state.board[row][col] = playerVal;
    console.log(`✅ Placed at [${row}][${col}] = ${playerVal}`);
    
    if (checkWin(this.state.board, row, col, playerVal)) {
      this.finishGame(username);
    } else if (checkDraw(this.state.board)) {
      this.finishGame('DRAW');
    } else {
      this.switchTurn();
    }
  }

  switchTurn() {
    this.state.currentPlayer = (this.state.currentPlayer === this.p1.username) 
      ? this.p2.username 
      : this.p1.username;
      
    this.broadcastUpdate();

    if (this.state.currentPlayer === this.p2.username && this.p2.isBot) {
      setTimeout(() => this.botMove(), 800);
    }
  }

  botMove() {
    const col = BotLogic.getBestMove(this.state.board, 2);
    this.makeMove(this.p2.username, col);
  }

  handleDisconnect(username) {
    console.log(`🔌 Disconnected: ${username}`);
    this.timers[username] = setTimeout(() => this.forfeit(username), 30000);
  }

  handleReconnect(player, newSocket) {
    if (this.timers[player.username]) {
        clearTimeout(this.timers[player.username]);
        delete this.timers[player.username];
        
        if (this.p1.username === player.username) this.p1.socketId = newSocket.id;
        if (this.p2.username === player.username) this.p2.socketId = newSocket.id;
        
        newSocket.join(this.gameId);
        newSocket.emit('game_restore', this.state);
        return true;
    }
    return false;
  }

  forfeit(loserUsername) {
    const winner = (loserUsername === this.p1.username) ? this.p2.username : this.p1.username;
    this.finishGame(winner);
  }

  async finishGame(result) {
    this.state.status = 'FINISHED';
    this.state.winner = result;
    this.broadcastUpdate();
    
    if (result !== 'DRAW') {
        try {
            await Game.create({
                player1: this.p1.username,
                player2: this.p2.username,
                winner: result,
            });
            console.log("💾 Saved to DB");
        } catch (e) { console.error(e); }
    }
  }

  broadcastUpdate() {
    this.io.to(this.gameId).emit('game_update', this.state);
  }
}

module.exports = GameRoom;