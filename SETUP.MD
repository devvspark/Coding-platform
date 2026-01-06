## Project Setup Guide

This document explains how to run the **CodeMaster** project (backend + frontend) on your local machine.

The project is split into:
- **Backend**: `Backend/` – Node.js (Express, MongoDB, Redis, Google OAuth, AI, email, etc.)
- **Frontend**: `Frontend/` – React + Vite single‑page application.

---

## 1. Prerequisites

- **Node.js**: v18 or later (LTS recommended)
- **npm**: comes with Node.js
- **MongoDB**: local instance or a cloud URI (e.g. MongoDB Atlas)
- **Redis**: local Redis server or a hosted instance
- A **Google Cloud** project (for Google OAuth) with OAuth 2.0 credentials
- (Optional) **Cloudinary** account for profile/problem image uploads

---

## 2. Clone the Repository

```bash
git clone https://github.com/devvspark/Coding-platform.git leet
cd leet

```

---

## 3. Backend Setup (`Backend/`)

### 3.1 Install Dependencies

```bash
cd Backend
npm install
```

### 3.2 Create Environment File

Create a `.env` file inside the `Backend/` folder. The exact keys may vary, but typically you will need variables like:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codemaster
JWT_SECRET=some-long-random-secret

REDIS_URL=redis://localhost:6379

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password-or-app-password

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

If you are unsure of the exact variable names, open the files in `Backend/src/config/` (e.g. `database.js`, `oauth2Client.js`, `cloudinary.js`) to see what environment variables they expect.

### 3.3 Run the Backend

The backend `package.json` exposes:

- **`npm start`** – runs `node src/index.js`

Start the server:

```bash
cd Backend
npm start
```

By default, the API will usually run on something like `http://localhost:5000` (confirm in `src/index.js`).

---

## 4. Frontend Setup (`Frontend/`)

### 4.1 Install Dependencies

```bash
cd Frontend
npm install
```

### 4.2 Configure Frontend Environment (if needed)

If the frontend needs environment variables (for example, base API URL), create a `.env` file in `Frontend/`.  
With Vite, variables must start with `VITE_`, for example:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Check files under `Frontend/src/config` and API service files (like `services/problemService.js` and `config/axios.js`) to confirm which variables/endpoints are used.

### 4.3 Run the Frontend Dev Server

The frontend `package.json` scripts:

- **`npm run dev`** – start Vite dev server
- **`npm run build`** – production build
- **`npm run preview`** – preview built app

To run the dev server:

```bash
cd Frontend
npm run dev
```

By default, Vite will start on `http://localhost:5173` (or a nearby port).

---

## 5. Typical Local Development Flow

1. **Start backend**:
   ```bash
   cd Backend
   npm start
   ```
2. **Start frontend** (in a second terminal):
   ```bash
   cd Frontend
   npm run dev
   ```
3. Open the frontend URL in your browser (usually `http://localhost:5173`).

Make sure the backend URL configured in the frontend (e.g. `VITE_API_BASE_URL`) matches the backend’s actual host/port.

---

## 6. Production Build (Frontend)

To build the frontend for production:

```bash
cd Frontend
npm run build
```

This generates a `dist/` folder that can be served by any static file host or integrated into a production Node.js deployment.

---

## 7. Useful Scripts Summary

- **Backend**:
  - `npm start` – run Express server (`src/index.js`)
- **Frontend**:
  - `npm run dev` – start Vite dev server
  - `npm run build` – production build
  - `npm run preview` – preview built bundle


