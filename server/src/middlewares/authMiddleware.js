const jwt = require("jsonwebtoken");
const EmployeeModel = require("../modules/Employee");

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }

  // Remove "Bearer" prefix from token
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("JWT Token:", jwtToken);

  try {
    // Verify the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECURITY_KEY);
    console.log("Verified token data:", isVerified);

    // Fetch the user from the database using userId
    const userData = await EmployeeModel.findById(isVerified.userId).select({ password: 0 });
    console.log("User Data from DB:", userData);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};


module.exports = authMiddleware;
