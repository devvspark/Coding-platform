const express = require('express');
const solutionVideoRouter =  express.Router();
const { 
    getVideoSignature, 
    saveVideoMetaData, 
    deleteSolutionVideo,
    updateVideoSolution,
    getVideoSolutionByProblemId,
    getVideoSolutionById
} = require('../controllers/solutionVideo');
const { 
    verifyToken, 
    doesAccountExist, 
    isAdmin, 
} = require("../middlewares");

// Order matters: more specific routes first
solutionVideoRouter.get("/upload/:problemId", verifyToken, doesAccountExist, isAdmin, getVideoSignature);
solutionVideoRouter.post("/save/:problemId", verifyToken, doesAccountExist, isAdmin, saveVideoMetaData);
solutionVideoRouter.delete("/delete/:solutionId", verifyToken, doesAccountExist, isAdmin, deleteSolutionVideo);
solutionVideoRouter.put("/update/:solutionId", verifyToken, doesAccountExist, isAdmin, updateVideoSolution);
solutionVideoRouter.get("/solution/:solutionId", verifyToken, doesAccountExist, isAdmin, getVideoSolutionById);
solutionVideoRouter.get("/:problemId", verifyToken, doesAccountExist, isAdmin, getVideoSolutionByProblemId);

module.exports = solutionVideoRouter;