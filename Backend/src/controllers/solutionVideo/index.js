const getVideoSignature = require('./getVideoSignature');
const deleteSolutionVideo = require('./deleteSolutionVideo');
const saveVideoMetaData = require('./saveVideoMetaData');
const updateVideoSolution = require('./updateVideoSolution');
const getVideoSolutionByProblemId = require('./getVideoSolutionByProblemId');
const getVideoSolutionById = require('./getVideoSolutionById');

module.exports = { 
    getVideoSignature,
    deleteSolutionVideo,
    saveVideoMetaData,
    updateVideoSolution,
    getVideoSolutionByProblemId,
    getVideoSolutionById
};