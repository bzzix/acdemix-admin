#!/bin/bash

# Variables
PROJECT_DIR="/home/bzzix/public_html/acdemix/portal-admin"
APP_NAME="acdemix-admin"


echo "🚀 Starting deployment..."

# Go to project directory
cd $PROJECT_DIR

# Fix Git ownership issue
echo "🔧 Fixing Git settings..."
git config --global --add safe.directory $PROJECT_DIR

# Pull latest updates
echo "📥 Pulling updates from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --omit=dev
npm install --save-dev sass-embedded-linux-x64 sass-embedded

# Build the project
echo "🔨 Building the project..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

