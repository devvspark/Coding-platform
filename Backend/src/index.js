const express = require("express");
const app = express();
const main = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authentication");
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problems");
const profileRouter = require("./routes/profile");
const submissionRouter = require("./routes/submissions");
const solutionVideoRouter = require('./routes/solutionVideo');
const adminRouter = require('./routes/admin');
const aiRouter = require("./routes/ai");
const cors = require("cors");

console.log('=== Loading Routes ===');

try {
  const authRouter = require("./routes/authentication");
  console.log('✅ Auth router loaded successfully');
} catch (error) {
  console.log('❌ Auth router failed to load:', error.message);
  console.log('Error stack:', error.stack);
}

try {
  const { authWithGithub, redirectToGithubPage } = require("./controllers/authentication/continueWithGithub");
  console.log('✅ GitHub OAuth controller loaded');
} catch (error) {
  console.log('❌ GitHub OAuth controller failed to load:', error.message);
  console.log('Error stack:', error.stack);
}

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/authentication", authRouter);
app.use("/profile", profileRouter);
app.use("/problems", problemRouter);
app.use("/submissions", submissionRouter);
app.use("/ai", aiRouter);
app.use("/solution-video", solutionVideoRouter);
app.use("/admin", adminRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

const InitializeConnections = async () => {
    try {
        // Check required environment variables
        const requiredEnvVars = ['DB_CONNECTION_STRING', 'JWT_KEY', 'FRONTEND_ORIGIN', 'PORT'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            console.error('Missing required environment variables:', missingVars);
            process.exit(1);
        }

        console.log('Connecting to database and Redis...');
        // connecting with database and redis
        await Promise.all([main(), redisClient.connect()]);
        console.log('Database and Redis connected successfully');

        // starting server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Codemaster server started on port ${port}`);
            console.log(`Frontend origin: ${process.env.FRONTEND_ORIGIN}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
}

InitializeConnections()

