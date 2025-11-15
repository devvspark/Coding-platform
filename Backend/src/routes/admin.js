const express = require("express");
const adminRouter = express.Router();
const { getPlatformData, deleteUser, createUser } = require("../controllers/admin");
const { verifyToken, doesAccountExist, isAdmin } = require("../middlewares");

// get platform data to send to admin portal
adminRouter.get("/platform-data", verifyToken, doesAccountExist, isAdmin, getPlatformData);

// delete user (admin only)
adminRouter.delete("/users/:userId", verifyToken, doesAccountExist, isAdmin, deleteUser);

// create user (admin only)
adminRouter.post("/create-user", verifyToken, doesAccountExist, isAdmin, createUser);

module.exports = adminRouter;