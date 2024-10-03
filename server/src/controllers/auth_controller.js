const bcrypt = require("bcryptjs")
const EmployeeModel = require('../modules/Employee')
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await EmployeeModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      
      const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECURITY_KEY, {
        expiresIn: "10d",
      });

      res.status(200).json({
        message: "Login Successful",
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error: ", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};




const register = async (req, res) => {
    try {
      const { name, email, password, position, organization } = req.body;
  
      
      const userExists = await EmployeeModel.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ msg: "Email already exists" });
      }
  
    
      const userCreated = await EmployeeModel.create({ name, email, password, position, organization});
  
      const token = await userCreated.generateToken();
      res.status(201).json({
        msg: "User created successfully",
        user: userCreated,
        token: token,
        userId: userCreated._id.toString(), 
      });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ msg: "Server error" });
    }
  };

  const user = async (req, res) => {
    try {
      const userData = req.user; 
      console.log("User Data:", userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`Error from user route: ${error}`);
      return res.status(500).json({ message: "Error fetching user data" });
    }
  };
  

module.exports = {login, register, user};