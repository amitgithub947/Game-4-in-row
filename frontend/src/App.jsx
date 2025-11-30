 import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import JoinScreen from './components/JoinScreen';
import Board from './components/Board';
import Leaderboard from './components/Leaderboard';
import GameStatus from './components/GameStatus';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(API_URL);

function App() {
  const [isInGame, setIsInGame] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [username, setUsername] = useState('');
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    socket.on('game_start', ({ gameId, state }) => {
      console.log("🟢 Game Started!", { gameId, state });
      setGameState({ ...state, gameId });
      setIsInGame(true);
      setGameResult(null);
    });

    socket.on('game_update', (newState) => {
      console.log("🔵 Update received. Current Player:", newState.currentPlayer);
      console.log("🔵 Board State:", newState.board);
      setGameState(newState);
      
      if (newState.status === 'FINISHED') {
        const result = newState.winner === 'DRAW' ? "Draw!" : (newState.winner === username ? "You Won! 🎉" : "You Lost 💀");
        setGameResult(result);
        setTimeout(() => { setIsInGame(false); setGameState(null); }, 5000);
      }
    });

    socket.on('game_restore', (state) => setGameState(state));
    return () => socket.off();
  }, [username]);

  const handleJoin = (u) => { setUsername(u); socket.emit('join_queue', { username: u }); };

  const handleMove = (col) => {
    console.log(`🖱️ Clicked Column: ${col}`);

    if (!gameState) {
        console.log("❌ Error: Game State is NULL");
        return;
    }
    
    if (gameState.currentPlayer !== username) {
        console.log(`❌ BLOCK: Not your turn!`);
        console.log(`   Expects: ${gameState.currentPlayer}`);
        console.log(`   You are: ${username}`);
        return;
    }

    console.log("✅ Sending Move to Server...", { gameId: gameState.gameId, col });
    socket.emit('make_move', { gameId: gameState.gameId, col });
  };

  const isMyTurn = gameState && gameState.currentPlayer === username;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center py-10 px-4 text-white">
      {!isInGame && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full border border-gray-700">
          <div className={`w-3 h-3 rounded-full ${socket.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm font-semibold">{socket.connected ? 'Online' : 'Offline'}</span>
        </div>
      )}
      
      {!isInGame ? (
        <div className="flex flex-col md:flex-row gap-10">
          <JoinScreen onJoin={handleJoin} />
          <Leaderboard />
        </div>
      ) : (
        !gameState ? <div>Loading...</div> :
        <div className="flex flex-col items-center">
          <GameStatus status={gameState.status} winner={gameResult} isMyTurn={isMyTurn} />
          
          <div className="mb-4 bg-gray-800 px-8 py-4 rounded-xl border-2 border-gray-700">
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Player 1 (Red)</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                  <span className={`font-bold ${
                    gameState.players.p1.username === username ? 'text-green-400' : 'text-white'
                  }`}>
                    {gameState.players.p1.username}
                    {gameState.players.p1.username === username ? ' (YOU)' : ''}
                  </span>
                </div>
              </div>
              
              <div className="text-2xl text-gray-600">VS</div>
              
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Player 2 (Yellow)</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                  <span className={`font-bold ${
                    gameState.players.p2.username === username ? 'text-green-400' : 'text-white'
                  }`}>
                    {gameState.players.p2.username}
                    {gameState.players.p2.username === username ? ' (YOU)' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Board board={gameState.board} onColumnClick={handleMove} myTurn={isMyTurn} winner={gameResult} />
          
          <button onClick={() => window.location.reload()} className="mt-6 text-red-500 underline text-sm">Leave Game</button>
        </div>
      )
    }
    </div>
  );
}
export default App;