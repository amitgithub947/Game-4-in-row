const Game = require('../models/Game');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Game.aggregate([
      { $match: { winner: { $ne: 'DRAW' } } },
      { $group: { _id: "$winner", wins: { $sum: 1 } } },
      { $sort: { wins: -1 } },
      { $limit: 10 }
    ]);

    res.json(leaderboard.map(entry => ({ username: entry._id, wins: entry.wins })));
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};