require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const gameManager = require('./game/GameManager');

const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

connectDB(); 

app.use('/api', apiRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`✅ Socket Connected: ${socket.id}`);

  socket.on('join_queue', ({ username }) => {
    gameManager.addPlayerToQueue(socket, username, io);
  });

  socket.on('make_move', ({ gameId, col }) => {
    gameManager.handleMove(socket, gameId, col);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket Disconnected: ${socket.id}`);
    gameManager.handleDisconnect(socket);
  });
});

setInterval(() => {
  gameManager.tryMatchmaking(io);
}, 1000);

app.get('/', (req, res) => res.send('Connect 4 Server Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));