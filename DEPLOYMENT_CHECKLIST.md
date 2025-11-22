# Deployment Checklist - Login/Signup Issues

## Issues Fixed in Code
✅ Cookie settings updated for production (secure, httpOnly, sameSite)
✅ Better error logging added
✅ Health check endpoint added
✅ Environment variable validation added

## Required Environment Variables in Render

Make sure these are set in your **Render backend service** → **Environment** tab:

### Critical Variables (Must Have)
```env
# Database
DB_CONNECTION_STRING=your_mongodb_connection_string

# JWT Authentication
JWT_KEY=your_jwt_secret_key

# Frontend URL (must match your Vercel domain exactly)
FRONTEND_ORIGIN=https://coding-platform-woad.vercel.app

# Server Port (Render usually sets this automatically, but verify)
PORT=10000

# Environment
NODE_ENV=production
```

### Optional but Recommended
```env
# Redis (if using Redis)
REDIS_URL=your_redis_url

# Other services you might be using
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Common Issues & Solutions

### 1. 500 Internal Server Error on Login/Register

**Possible Causes:**
- Missing `JWT_KEY` environment variable
- Missing `DB_CONNECTION_STRING` environment variable
- Database connection failing
- Redis connection failing (if required)

**Solution:**
1. Check Render logs for the actual error message
2. Verify all environment variables are set
3. Test database connection string locally
4. Check if Redis is required and properly configured

### 2. 401 Unauthorized on /authentication/check

**Possible Causes:**
- Cookie not being sent (CORS/cookie settings)
- Token expired or invalid
- Cookie settings mismatch

**Solution:**
1. Verify `FRONTEND_ORIGIN` matches your Vercel URL exactly
2. Check browser DevTools → Application → Cookies
3. Ensure cookies are being sent with requests (check Network tab)

### 3. Cookies Not Working

**Fixed in Code:**
- Cookies now use `secure: true` in production
- Cookies use `sameSite: 'None'` for cross-site requests
- Cookies use `httpOnly: true` for security

**Verify:**
1. Your frontend URL uses `https://` (Vercel does this automatically)
2. Your backend URL uses `https://` (Render does this automatically)
3. `FRONTEND_ORIGIN` in Render matches your Vercel URL exactly

## Step-by-Step Verification

### Step 1: Check Environment Variables in Render
1. Go to Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Verify all variables listed above are present
5. **Important:** Make sure there are no extra spaces or quotes

### Step 2: Check Render Logs
1. Go to your Render service → **Logs** tab
2. Look for:
   - "HackForge server started on port..."
   - "Database and Redis connected successfully"
   - Any error messages

### Step 3: Test Health Endpoint
Visit: `https://your-backend.onrender.com/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production"
}
```

### Step 4: Check CORS Configuration
In Render, verify `FRONTEND_ORIGIN` is:
- Exactly: `https://coding-platform-woad.vercel.app`
- No trailing slash
- No `http://` (must be `https://`)

### Step 5: Test Database Connection
If you see database errors in logs:
1. Verify `DB_CONNECTION_STRING` is correct
2. Check if your MongoDB allows connections from Render's IPs
3. Test the connection string locally

### Step 6: Check Frontend Configuration
In your Vercel frontend, verify:
- `VITE_API_URL` or `VITE_BACKEND_BASE_URL` points to your Render backend
- Should be: `https://coding-platform-9n1z.onrender.com`
- No trailing slash

## Debugging Steps

### 1. Check Render Logs After Deploy
After deploying, check logs for:
```
✅ "HackForge server started on port..."
✅ "Database and Redis connected successfully"
❌ Any error messages
```

### 2. Test Login Endpoint Directly
Use Postman or curl to test:
```bash
curl -X POST https://your-backend.onrender.com/authentication/login \
  -H "Content-Type: application/json" \
  -d '{"emailId":"test@example.com","password":"test123"}' \
  -v
```

### 3. Check Browser Network Tab
1. Open browser DevTools → Network tab
2. Try to login
3. Check the request:
   - Status code
   - Response body (error message)
   - Request headers
   - Response headers (check for Set-Cookie)

### 4. Check Cookies in Browser
1. Open DevTools → Application → Cookies
2. Check if `token` cookie is set after login
3. Verify cookie properties:
   - Domain
   - Path
   - Secure (should be checked)
   - SameSite (should be "None")

## Quick Fixes

### If 500 Error Persists:
1. **Check Render logs** - The error message will tell you what's wrong
2. **Verify JWT_KEY is set** - This is required for token generation
3. **Verify DB_CONNECTION_STRING** - Database must be accessible
4. **Check if Redis is required** - If Redis connection fails, verify REDIS_URL

### If Cookies Not Working:
1. **Verify FRONTEND_ORIGIN** - Must match Vercel URL exactly
2. **Check CORS settings** - Should allow credentials
3. **Verify HTTPS** - Both frontend and backend must use HTTPS
4. **Clear browser cache** - Old cookies might interfere

### If 401 on /check:
1. **Check if token cookie exists** - In browser DevTools
2. **Verify token is valid** - Check JWT_KEY matches
3. **Check Redis** - If token is blocked in Redis

## After Making Changes

1. **Redeploy** your Render service after changing environment variables
2. **Wait** for deployment to complete
3. **Clear browser cache/cookies**
4. **Test in incognito window** to avoid cached issues
5. **Check Render logs** for any new errors

## Still Not Working?

If you've checked everything above and it still doesn't work:

1. **Share Render logs** - Copy the error messages from Render logs
2. **Share environment variable names** - (not values, just names to verify they're set)
3. **Share Network tab details** - From browser DevTools when trying to login
4. **Test health endpoint** - Share the response from `/health`

The improved error logging will now show more detailed error messages in Render logs, which will help identify the exact issue.

