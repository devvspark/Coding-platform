const SolutionVideo = require('../../models/solutionVideo');
const mongoose = require('mongoose');
const cloudinary = require('../../config/cloudinary');

const updateVideoSolution = async (req, res) => {
  try {
    const { solutionId } = req.params;  // ✅ use solutionId
    const trimmedId = solutionId.trim(); 
    const { cloudinaryPublicId, secureUrl, duration } = req.body;

    console.log("🟡 Incoming update request for:", trimmedId);
    console.log("🟢 Body:", req.body);

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).json({ error: "Invalid solution ID" });
    }

    // ✅ Check required fields
    if (!cloudinaryPublicId || !secureUrl || !duration) {
      return res.status(400).json({
        error: "Missing required fields: cloudinaryPublicId, secureUrl, duration"
      });
    }

    // ✅ Verify the upload with Cloudinary
    let cloudinaryResource;
    try {
      cloudinaryResource = await cloudinary.api.resource(
        cloudinaryPublicId,
        { resource_type: 'video' }
      );
    } catch (cloudinaryError) {
      console.error("❌ Cloudinary verification error:", cloudinaryError);
      return res.status(400).json({ error: 'Video not found on Cloudinary' });
    }

    // ✅ Generate new thumbnail URL
    const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
      resource_type: 'image',  
      transformation: [
        { width: 400, height: 225, crop: 'fill' },
        { quality: 'auto' },
        { start_offset: 'auto' }  
      ],
      format: 'jpg'
    });

    // ✅ Update the solution directly by ID
    const updatedSolution = await SolutionVideo.findByIdAndUpdate(
        trimmedId,
      {
        cloudinaryPublicId,
        secureUrl: cloudinaryResource.secure_url || secureUrl,
        duration: cloudinaryResource.duration || duration,
        thumbnailUrl,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('problem', 'title problemNo difficulty tags');

    if (!updatedSolution) {
      return res.status(404).json({ error: "Video solution not found" });
    }

    res.status(200).json({
      message: "✅ Video solution updated successfully",
      videoSolution: updatedSolution
    });

  } catch (error) {
    console.error("❌ Error updating video solution:", error);
    res.status(500).json({
      error: "Internal server error while updating video solution",
      details: error.message
    });
  }
};

module.exports = updateVideoSolution;
