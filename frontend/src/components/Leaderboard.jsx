import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/leaderboard`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-10 w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-yellow-500/50">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-5">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          🏆 Top Players
        </h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-800/80 text-gray-300 border-b-2 border-gray-600">
            <th className="px-6 py-4 font-bold text-lg">Rank</th>
            <th className="px-6 py-4 font-bold text-lg">Player</th>
            <th className="px-6 py-4 font-bold text-lg text-right">Wins</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.length === 0 ? (
            <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 text-lg">🎮 No games played yet</td></tr>
          ) : (
            data.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-700/50 transition-all">
                <td className="px-6 py-4 text-2xl">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </td>
                <td className="px-6 py-4 font-bold text-white text-lg">{user.username}</td>
                <td className="px-6 py-4 text-right text-green-400 font-bold text-xl">{user.wins}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;