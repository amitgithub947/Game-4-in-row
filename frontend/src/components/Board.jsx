import React from 'react';

const Board = ({ board, onColumnClick, myTurn, winner }) => {
  const handleCellClick = (col) => {
    if (myTurn && !winner) {
      console.log('🎯 Board Click - Column:', col, 'MyTurn:', myTurn);
      onColumnClick(col);
    }
  };

  const renderBoard = () => {
    const cells = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        const cell = board[row][col];
        const isClickable = myTurn && !winner;
        cells.push(
          <div 
            key={`${row}-${col}`} 
            onClick={() => handleCellClick(col)}
            style={{
              backgroundColor: cell === 1 ? '#ef4444' : cell === 2 ? '#facc15' : '#e5e7eb',
              cursor: isClickable ? 'pointer' : 'not-allowed',
              border: '3px solid #1e3a8a',
              boxShadow: isClickable ? '0 4px 6px rgba(0,0,0,0.3)' : 'inset 0 2px 4px rgba(0,0,0,0.3)',
              transform: 'scale(1)',
              transition: 'all 0.2s ease'
            }}
            className="w-14 h-14 rounded-full hover:scale-110 active:scale-95" 
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl border-4 border-blue-700 shadow-2xl inline-block">
      <div className="grid grid-cols-7 gap-3">
        {renderBoard()}
      </div>
      
      {/* Turn Indicator */}
      <div className="mt-4 text-center">
        <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${
          myTurn ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-600 text-gray-300'
        }`}>
          {myTurn ? "🎮 YOUR TURN" : "⏳ OPPONENT'S TURN"}
        </div>
      </div>
    </div>
  );
};
export default Board;