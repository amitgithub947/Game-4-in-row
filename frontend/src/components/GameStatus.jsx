import React from 'react';

const GameStatus = ({ status, winner, isMyTurn }) => {
  if (status === 'FINISHED') {
    const isWin = winner?.includes('Won');
    const isDraw = winner?.includes('Draw');
    return (
      <div className={`text-5xl font-extrabold mb-8 animate-bounce p-6 rounded-2xl ${
        isWin ? 'text-green-400 bg-green-900/30 border-4 border-green-500' : 
        isDraw ? 'text-yellow-400 bg-yellow-900/30 border-4 border-yellow-500' : 
        'text-red-400 bg-red-900/30 border-4 border-red-500'
      }`}>
        {isWin ? '🎉 ' : isDraw ? '🤝 ' : '💔 '}{winner}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 mb-6 px-8 py-4 rounded-full shadow-2xl border-2 ${
      isMyTurn ? 'bg-green-900/50 border-green-500' : 'bg-orange-900/50 border-orange-500'
    }`}>
      <div className={`w-5 h-5 rounded-full ${isMyTurn ? 'bg-green-500 animate-ping' : 'bg-orange-500 animate-pulse'}`}></div>
      <span className="text-2xl font-bold text-white">
        {isMyTurn ? "⚡ Your Turn!" : "⏳ Waiting..."}
      </span>
    </div>
  );
};

export default GameStatus;