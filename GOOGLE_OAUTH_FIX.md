# Google OAuth Error Fix Guide

## Problem
You're seeing "Error 400: invalid_request" when trying to login/signup with Google. This happens because Google's OAuth 2.0 configuration doesn't match your production URLs.

## Root Cause
When you deploy to production (Vercel + Render), Google needs to know:
1. **Authorized JavaScript origins** - Where your frontend is hosted
2. **Authorized redirect URIs** - Where Google should send users back after authentication

These must match your production URLs exactly.

## Solution: Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one if you haven't)
3. Navigate to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID (or create one if needed)
5. Click **Edit** (pencil icon)

### Step 2: Configure Authorized JavaScript Origins
Add your frontend URL:
```
https://your-frontend-app.vercel.app
```
**Note:** 
- Must use `https://` (not `http://`)
- No trailing slash
- Replace `your-frontend-app.vercel.app` with your actual Vercel domain

### Step 3: Configure Authorized Redirect URIs
Add your backend callback URL:
```
https://your-backend-app.onrender.com/authentication/google/callback
```
**Note:**
- Must use `https://` (not `http://`)
- Must match exactly: `/authentication/google/callback`
- Replace `your-backend-app.onrender.com` with your actual Render domain

### Step 4: Save Changes
Click **Save** and wait a few minutes for changes to propagate.

## Environment Variables Setup

Make sure these environment variables are set correctly in your **Render backend**:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-backend-app.onrender.com/authentication/google/callback
FRONTEND_ORIGIN=https://your-frontend-app.vercel.app
```

### How to Set Environment Variables in Render:
1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add each variable with its value
5. Save and redeploy

## Important Notes

### For Development (Local)
If you're also testing locally, you'll need to add:
- **Authorized JavaScript origins:** `http://localhost:3000` (or your local port)
- **Authorized redirect URIs:** `http://localhost:YOUR_PORT/authentication/google/callback`

### OAuth App Verification
If your app is in testing mode:
- Only users added to "Test users" in Google Cloud Console can sign in
- To allow all users, you need to submit your app for verification (if using sensitive scopes)

### Common Mistakes to Avoid
1. ❌ Using `http://` instead of `https://` in production
2. ❌ Adding trailing slashes (`/authentication/google/callback/`)
3. ❌ Wrong callback path (must be exactly `/authentication/google/callback`)
4. ❌ Mismatched environment variables
5. ❌ Not waiting for Google's changes to propagate (can take 5-10 minutes)

## Testing After Fix
1. Clear your browser cache/cookies
2. Try logging in with Google again
3. Check browser console and Render logs for any errors

## Still Having Issues?

Check:
- [ ] All URLs use `https://` in production
- [ ] Redirect URI matches exactly (case-sensitive)
- [ ] Environment variables are set correctly in Render
- [ ] Google Cloud Console changes have been saved
- [ ] You've waited 5-10 minutes after saving changes
- [ ] Your Render backend is actually running and accessible

