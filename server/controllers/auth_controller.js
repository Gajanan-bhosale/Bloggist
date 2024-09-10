const bcrypt = require("bcryptjs")
const EmployeeModel = require('../modules/Employee')

const login = async(req,res) =>{
    try {
        const { email, password } = req.body;

        const userExist = await EmployeeModel.findOne({email });
        console.log(userExist);

        if(!userExist) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        //const user = await bcrypt.comapre(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user) {
            res.status(200).json({
                msg: "login Succesful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        } else {
            res.status(401).json({message: "Invalid email or Password"})
        }
    } catch (error) {
        // res.status(500).json("Internal server error")
        next(error) 
    }
}

const register = async(req, res) => {
    

    try {
        const {name, email, password} = req.body;
       
        const userExit = await EmployeeModel.findOne({email});
        
        if (userExit) {
            return res.status(400).json({ msg : "email already exist"})
        }
        const userCreated = await EmployeeModel.create({name, email, password });

        res.status(201).json({msg : userCreated, token: await userCreated.generateToken(), userId: userCreated._id > this.toString(),});
    } catch(error) {
        next(error)
    }
}

module.exports = {login, register};