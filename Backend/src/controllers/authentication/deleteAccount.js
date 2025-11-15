const User = require("../../models/users");
const mongoose = require("mongoose");

const deleteAccount = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.payload._id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({ error: "User not found" });
        }

        // Delete the user account
        await User.findByIdAndDelete(userId, { session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).send({ 
            message: "Account deleted successfully",
            success: true 
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ error: error.message });
    }
};

module.exports = deleteAccount;




