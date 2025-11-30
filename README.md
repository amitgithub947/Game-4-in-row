# 🎮 Connect 4 Game - Multiplayer

A real-time multiplayer Connect 4 game with Socket.IO, MongoDB leaderboard, and AI bot opponent.
Github url:https://github.com/amitgithub947/Game-4-in-row

## 🚀 Features

- ✅ Real-time multiplayer gameplay
- 🤖 AI Bot opponent (if no players available)
- 🏆 Leaderboard with win tracking
- 🎨 Beautiful gradient UI with Tailwind CSS
- 📱 Responsive design

## 📦 Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS 4
- Socket.IO Client

**Backend:**
- Node.js + Express
- Socket.IO
- MongoDB (Mongoose)
- UUID for game IDs

## 🛠️ Local Development

### Backend Setup
```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
CLIENT_URL=your_frontend_url
```

**Frontend (.env):**
```
VITE_API_URL=your_backend_url
```

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy!

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set framework preset: Vite
4. Add environment variable: `VITE_API_URL`
5. Deploy!

## 🎯 How to Play

1. Enter your username
2. Wait for matchmaking (or play with AI Bot after 10 seconds)
3. Red player goes first
4. Click columns to drop your piece
5. Connect 4 in a row (horizontal, vertical, or diagonal) to win!

## 👨‍💻 Author

Built with ❤️ by Amit

---

⭐ Star this repo if you like it!
