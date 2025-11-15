const User = require("../../models/users");

const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, fullName, emailId, password, role } = req.body;

    // Validate required fields
    if (!username || !fullName || !emailId || !password) {
      return res.status(400).json({
        error: "Missing required fields: username, fullName, emailId, password"
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        error: "Username already exists"
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ emailId });
    if (existingEmail) {
      return res.status(409).json({
        error: "Email already exists"
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long"
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      username,
      fullName,
      emailId,
      password: hashedPassword,
      role: role || "user", // Default to "user" if not specified
      emailVerified: true, // Admin-created users can be auto-verified
      points: 0,
      noSolvedProblems: 0,
      favouriteProblems: [],
      likedProblems: [],
      checkedProblems: [],
      bookmarks: [],
      streaks: {
        current: 0,
        longest: 0,
        lastUpdated: new Date()
      }
    });

    // Save user to database
    await newUser.save();

    // Return user data without password
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      emailId: newUser.emailId,
      role: newUser.role,
      emailVerified: newUser.emailVerified,
      points: newUser.points,
      noSolvedProblems: newUser.noSolvedProblems,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    res.status(201).json({
      message: "User created successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Internal server error while creating user"
    });
  }
};

module.exports = createUser;




















