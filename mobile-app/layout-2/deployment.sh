#!/bin/bash

# Define your deployment variables
APP_NAME="My CMS App Builder"           # Replace with your app's name
BUILD_SCRIPT="prod"    # Replace with your Ionic build script
FIREBASE_PROJECT="ccms-app-builder"    # Replace with your Firebase project name

# Step 1: Build your Ionic app
echo "Step 1: Building Ionic app..."
ionic build --$BUILD_SCRIPT

# Step 2: Deploy to Firebase Hosting
echo "Step 2: Deploying to Firebase Hosting..."
firebase deploy --project $FIREBASE_PROJECT

# Step 3: Display deployment status
echo "Deployment completed for $APP_NAME."
