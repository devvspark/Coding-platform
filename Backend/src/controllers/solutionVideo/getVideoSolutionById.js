const SolutionVideo = require('../../models/solutionVideo');
const mongoose = require('mongoose');

const getVideoSolutionById = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const trimmedId = solutionId.trim();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).json({ error: "Invalid solution ID provided." });
    }

    const videoSolution = await SolutionVideo.findById(trimmedId)
      .populate('problem', 'title problemNo difficulty tags createdAt');

    if (!videoSolution) {
      return res.status(404).json({
        error: "Video solution not found"
      });
    }

    res.json(videoSolution);

  } catch (error) {
    console.error("Error fetching video solution:", error);
    res.status(500).json({
      error: "Internal server error while fetching video solution",
      details: error.message
    });
  }
};

module.exports = getVideoSolutionById;

