 const { v4: uuidv4 } = require('uuid');
const GameRoom = require('./GameRoom');

class GameManager {
  constructor() {
    if (GameManager.instance) return GameManager.instance;
    this.games = new Map();
    this.playerGameMap = new Map();
    this.queue = [];
    GameManager.instance = this;
  }

  addPlayerToQueue(socket, username, io) {
    const alreadyInQueue = this.queue.some(q => q.player.username === username);
    if (alreadyInQueue) {
      console.log(`⚠️ ${username} already in queue, removing old entry`);
      this.queue = this.queue.filter(q => q.player.username !== username);
    }

    const player = { username, socketId: socket.id };

    console.log(`👤 Queue Join: ${username} (Socket: ${socket.id.substring(0, 5)})`);

    for (const game of this.games.values()) {
        if (game.state.status === 'IN_PROGRESS') {
            if (game.p1.username === username || game.p2.username === username) {
                console.log(`🔄 Reconnecting ${username}`);
                game.handleReconnect(player, socket);
                this.playerGameMap.set(socket.id, game.gameId);
                return;
            }
        }
    }

    this.queue.push({ player, joinedAt: Date.now() });
    this.tryMatchmaking(io);
  }

  tryMatchmaking(io) {
    while (this.queue.length >= 2) {
      const entry1 = this.queue.shift();
      const entry2 = this.queue.shift();
      
      const p1 = entry1.player;
      const p2 = entry2.player;
      
      if (p1.username === p2.username) {
        this.queue.unshift(entry2);
        this.queue.push(entry1);
        continue;
      }
      
      this.createGame(io, p1, p2);
    }

    const now = Date.now();
    for (let i = this.queue.length - 1; i >= 0; i--) {
      if (now - this.queue[i].joinedAt > 10000) {
        const user = this.queue.splice(i, 1)[0].player;
        const bot = { username: 'AI Bot', socketId: null, isBot: true };
        this.createGame(io, user, bot);
      }
    }
  }

  createGame(io, p1, p2) {
    const gameId = uuidv4();
    const game = new GameRoom(gameId, io, p1, p2);
    
    this.games.set(gameId, game);
    
    this.playerGameMap.set(p1.socketId, gameId);
    if (!p2.isBot) this.playerGameMap.set(p2.socketId, gameId);

    const s1 = io.sockets.sockets.get(p1.socketId);
    if (s1) s1.join(gameId);
    
    const s2 = !p2.isBot ? io.sockets.sockets.get(p2.socketId) : null;
    if (s2) s2.join(gameId);

    console.log(`✅ Game Started: ${p1.username} vs ${p2.username}`);
    io.to(gameId).emit('game_start', { gameId, state: game.state });
  }

  handleMove(socket, gameId, col) {
    const game = this.games.get(gameId);
    if (!game) return;

    let username = null;
    if (game.p1.socketId === socket.id) username = game.p1.username;
    else if (!game.p2.isBot && game.p2.socketId === socket.id) username = game.p2.username;

    if (username) {
        game.makeMove(username, col);
    } else {
        console.log("❌ Move rejected: Unknown socket");
    }
  }

  handleDisconnect(socket) {
    const gameId = this.playerGameMap.get(socket.id);
    if (gameId) {
        const game = this.games.get(gameId);
        if (game.p1.socketId === socket.id) game.handleDisconnect(game.p1.username);
        if (game.p2.socketId === socket.id) game.handleDisconnect(game.p2.username);
    }
    this.playerGameMap.delete(socket.id);
    this.queue = this.queue.filter(q => q.player.socketId !== socket.id);
  }
}

module.exports = new GameManager();