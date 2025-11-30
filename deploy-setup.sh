#!/bin/bash

echo "🚀 Connect 4 - Quick Deployment Setup"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Connect 4 multiplayer game"
    git branch -M main
    echo "✅ Git initialized!"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a GitHub repository at: https://github.com/new"
echo ""
echo "2. Run these commands:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git push -u origin main"
echo ""
echo "3. Backend Deployment (Render):"
echo "   - Go to: https://render.com"
echo "   - New → Web Service"
echo "   - Connect GitHub repo"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Add environment variables from backend/.env.example"
echo ""
echo "4. Frontend Deployment (Vercel):"
echo "   - Go to: https://vercel.com"
echo "   - New Project → Import GitHub repo"
echo "   - Root Directory: frontend"
echo "   - Framework: Vite"
echo "   - Add VITE_API_URL with your Render backend URL"
echo ""
echo "📖 Full guide available in: DEPLOYMENT.md"
echo ""
