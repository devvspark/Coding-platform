const cloudinary = require('../../config/cloudinary');
const SolutionVideo = require("../../models/solutionVideo");
const mongoose = require('mongoose');

const deleteSolutionVideo = async (req, res) => {
  try {
    const { solutionId } = req.params; // Changed from problemId to solutionId
    const trimmedId = solutionId.trim();

    console.log("🟡 Incoming delete request for solution ID:", trimmedId);

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).json({ error: "Invalid solution ID provided." });
    }

    // ✅ Find the video solution by ID
    const video = await SolutionVideo.findById(trimmedId);

    if (!video) {
      return res.status(404).json({ error: 'Video solution not found' });
    }

    // ✅ Delete from Cloudinary
    try {
      if (video.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(video.cloudinaryPublicId, { 
          resource_type: 'video', 
          invalidate: true 
        });
        console.log("✅ Cloudinary video deleted:", video.cloudinaryPublicId);
      }
    } catch (cloudinaryError) {
      console.error("⚠️ Cloudinary delete error (continuing with DB delete):", cloudinaryError);
      // Continue with DB deletion even if Cloudinary deletion fails
    }

    // ✅ Delete from database
    await SolutionVideo.findByIdAndDelete(trimmedId);

    res.status(200).json({ message: 'Video solution deleted successfully' });

  } catch (error) {
    console.error('❌ Error deleting video solution:', error);
    res.status(500).json({ 
      error: 'Failed to delete video solution',
      details: error.message 
    });
  }
};

module.exports = deleteSolutionVideo;