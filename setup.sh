#!/bin/bash

# PlumberConnect Quick Start Setup
# This script will help you get started with PlumberConnect

echo "🔧 PlumberConnect MVP Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Ready to start!"
    echo ""
    echo "Run one of the following commands:"
    echo ""
    echo "  npm start       - Start both frontend and backend"
    echo "  npm run server  - Start backend only (port 5000)"
    echo "  npm run client  - Start frontend only (port 3000)"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
    echo ""
    echo "Demo Login Credentials:"
    echo "  Email: plumber@demo.com | Password: demo123"
    echo "  Email: client@demo.com  | Password: demo123"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi
