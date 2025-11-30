# 🚀 Deployment Guide - Connect 4 Game

## Option 1: Deploy on Render (Backend) + Vercel (Frontend)

### 📌 Step 1: Prepare Your Code

1. **Create GitHub Repository**
```bash
cd C:/Users/amitm/Desktop/assignment
git init
git add .
git commit -m "Initial commit - Connect 4 game"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## 🖥️ Backend Deployment (Render.com)

### Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `connect4-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. **Add Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://amitmedheshiya2004_db_user:ANhZNJfPRdMWMJyT@cluster0.5o4synm.mongodb.net/?appName=Cluster0
   CLIENT_URL=https://YOUR_FRONTEND_URL.vercel.app
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://connect4-backend.onrender.com`)

---

## 🌐 Frontend Deployment (Vercel)

### Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Add Environment Variable:**
   ```
   VITE_API_URL=https://YOUR_BACKEND_URL.onrender.com
   ```
   (Replace with your actual Render backend URL)

6. Click **"Deploy"**
7. Wait for deployment (2-3 minutes)
8. Your app is live! 🎉

---

## 🔄 Update Backend with Frontend URL

After Vercel deployment:
1. Go back to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `CLIENT_URL` with your Vercel URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
5. Save and redeploy

---

## ✅ Verify Deployment

1. Open your Vercel frontend URL
2. Enter a username and click "Find Match"
3. Should connect to backend and start game with AI Bot
4. Check browser console for connection status

---

## 🐛 Troubleshooting

### Backend won't start:
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure PORT is set to 5000

### Frontend can't connect:
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend URL is correct and includes `https://`
- Check browser console for CORS errors

### CORS Error:
- Make sure `CLIENT_URL` in backend .env matches your Vercel URL
- Backend already has `cors({ origin: "*" })` for development

---

## 💰 Cost

- **Render Free Tier:** ✅ Free (spins down after inactivity)
- **Vercel Free Tier:** ✅ Free (unlimited)
- **MongoDB Atlas:** ✅ Free (512 MB)

**Total Cost: $0** 🎉

---

## 🔗 Alternative: Deploy Both on Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy backend service
4. Deploy frontend service
5. Add environment variables
6. Done!

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] MongoDB connected
- [ ] Socket.IO connections working
- [ ] Game playable end-to-end
- [ ] Leaderboard showing data

---

## 🎮 Share Your Game!

Your game is now live! Share the Vercel URL with friends:
```
https://your-connect4-game.vercel.app
```

Good luck! 🚀
