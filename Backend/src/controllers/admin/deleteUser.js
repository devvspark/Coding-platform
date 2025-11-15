const User = require("../../models/users");
const mongoose = require("mongoose");

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // checking if userId is provided or not
        if(!userId)
            return res.status(400).send({ error: "User ID is not given"});

        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(userId)) 
            return res.status(400).send({ error: "Invalid User ID provided."});

        // fetching user with the given id from the 'users' collection
        const deletedUser = await User.findByIdAndDelete(userId);

        // checking if user with the given id existed in the 'users' collection or not
        if (!deletedUser) 
            return res.status(404).send({ error: "User not found with the given ID."});

        res.status(200).send({ message: "User deleted successfully", user: deletedUser });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = deleteUser;
