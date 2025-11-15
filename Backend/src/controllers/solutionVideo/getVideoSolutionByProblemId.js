const getVideoSolutionByProblemId = async (req, res) => {
    try {
        const { problemId } = req.params; // Changed from solutionId to problemId

        const videoSolution = await SolutionVideo.findOne({ problem: problemId })
            .populate('problem', 'title problemNo difficulty tags createdAt');

        if (!videoSolution) {
            return res.status(404).json({
                error: "Video solution not found for this problem"
            });
        }

        res.json(videoSolution);

    } catch (error) {
        console.error("Error fetching video solution:", error);
        res.status(500).json({
            error: "Internal server error while fetching video solution"
        });
    }
};

module.exports = getVideoSolutionByProblemId;