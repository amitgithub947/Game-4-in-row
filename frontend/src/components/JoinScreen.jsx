import React, { useState } from 'react';

const JoinScreen = ({ onJoin }) => {
  const [username, setUsername] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Title with better visibility */}
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-2 drop-shadow-2xl">
          🎮 Connect 4
        </h1>
        <p className="text-gray-400 text-lg font-medium">Challenge players worldwide!</p>
      </div>
      
      {/* Join Card with improved visibility */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl shadow-2xl border-2 border-blue-500/50 w-full max-w-md">
        <label className="block text-white text-lg font-bold mb-3">Enter Your Name</label>
        <input 
          type="text" 
          placeholder="Type your username..." 
          className="w-full p-4 mb-6 text-white bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold placeholder-gray-400 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && username.trim() && onJoin(username.trim())}
          autoFocus
        />
        
        <button 
          onClick={() => username.trim() && onJoin(username.trim())}
          disabled={!username.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg"
        >
          {username.trim() ? '🎯 Find Match' : '⚠️ Enter Name First'}
        </button>
        
        <p className="text-gray-500 text-sm mt-4 text-center">Press Enter or click to start</p>
      </div>
    </div>
  );
};

export default JoinScreen;