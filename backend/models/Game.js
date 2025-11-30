const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  winner: { type: String, required: true }, // Username or 'DRAW'
  playedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);