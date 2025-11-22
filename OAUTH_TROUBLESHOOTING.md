# Google OAuth Troubleshooting Guide

## Error 400: invalid_request - Still Getting This Error?

If you've configured everything correctly but still getting this error, check the following:

### 1. OAuth App Publishing Status ⚠️ **MOST COMMON ISSUE**

**Problem:** Your OAuth app might be in "Testing" mode, which only allows specific test users.

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **OAuth consent screen**
3. Check the **Publishing status** at the top
4. If it says "Testing", you have two options:

   **Option A: Add Test Users (Quick Fix)**
   - Scroll down to "Test users"
   - Click "+ ADD USERS"
   - Add your email: `onkarlgodase225@gmail.com`
   - Save and try again

   **Option B: Publish Your App (Recommended for Production)**
   - Click "PUBLISH APP"
   - Confirm the publishing
   - Note: This makes your app available to all Google users

### 2. Verify Redirect URI Match Exactly

The redirect URI must match **EXACTLY** (case-sensitive, no trailing slashes):

**In Google Cloud Console:**
```
https://your-backend.onrender.com/authentication/google/callback
```

**In Render Environment Variables:**
```env
GOOGLE_REDIRECT_URI=https://your-backend.onrender.com/authentication/google/callback
```

**Common Mistakes:**
- ❌ `http://` instead of `https://`
- ❌ Trailing slash: `/authentication/google/callback/`
- ❌ Different case: `/Authentication/Google/Callback`
- ❌ Extra spaces or characters

### 3. Check Environment Variables Are Actually Loaded

Add this temporary logging to verify (in `continueWithGoogle.js`):
```javascript
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'MISSING');
console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI);
```

**In Render:**
1. Go to your service → **Environment** tab
2. Verify all variables are set correctly
3. Make sure there are no extra spaces
4. **Redeploy** after adding/changing environment variables

### 4. Verify Authorized JavaScript Origins

In Google Cloud Console, under your OAuth 2.0 Client:
- **Authorized JavaScript origins** must include:
  ```
  https://your-frontend.vercel.app
  ```
- No trailing slash
- Must be `https://` (not `http://`)

### 5. Check OAuth Consent Screen Configuration

1. Go to **OAuth consent screen**
2. Verify:
   - **App name** is set
   - **User support email** is set
   - **Developer contact information** is set
   - **Scopes** include:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`

### 6. Wait for Propagation

After making changes in Google Cloud Console:
- Wait **5-10 minutes** for changes to propagate
- Clear browser cache and cookies
- Try in an incognito/private window

### 7. Check Render Logs

1. Go to Render dashboard → Your service → **Logs**
2. Look for the OAuth logs we added:
   - `OAuth Redirect URI: ...`
   - `OAuth Client ID: Set/Missing`
   - `Generated OAuth URL: ...`
3. Check for any error messages

### 8. Verify the Actual Redirect URI in the Generated URL

When you click "Sign in with Google", check the URL in your browser:
- It should contain `redirect_uri=...`
- Copy that redirect_uri value
- Compare it EXACTLY with what's in Google Cloud Console

### 9. Check for Multiple OAuth Clients

Make sure you're using the same OAuth 2.0 Client ID:
- In Google Cloud Console (for configuration)
- In Render environment variables (for your app)

### 10. Domain Verification (If Required)

If you're using a custom domain:
- Make sure the domain is verified in Google Search Console
- This is usually not required for standard OAuth flows

## Quick Debugging Steps

1. **Check Render Logs:**
   ```bash
   # In Render dashboard, check logs when you click "Sign in with Google"
   # Look for: "OAuth Redirect URI: ..."
   ```

2. **Test the Redirect URI Directly:**
   - Try accessing: `https://your-backend.onrender.com/authentication/google/callback?code=test`
   - Check what error you get (this helps verify the route is working)

3. **Verify Environment Variables:**
   - In Render, temporarily add a test endpoint that returns env vars (remove after testing)
   - Or check the logs we added

4. **Compare URLs Character by Character:**
   - Copy redirect URI from Google Cloud Console
   - Copy redirect URI from Render environment variable
   - Compare them side by side

## Still Not Working?

If none of the above works, the issue might be:

1. **OAuth App Needs Verification:**
   - If your app uses sensitive scopes, Google might require verification
   - This can take several days
   - Check the OAuth consent screen for any warnings

2. **Rate Limiting:**
   - Too many failed attempts might temporarily block requests
   - Wait 15-30 minutes and try again

3. **Browser/Network Issues:**
   - Try a different browser
   - Try from a different network
   - Clear all cookies and cache

## Need More Help?

Share these details:
1. Screenshot of your Google Cloud Console OAuth 2.0 Client settings
2. Your Render environment variables (hide sensitive values)
3. Render logs when attempting to sign in
4. The exact error message you see

