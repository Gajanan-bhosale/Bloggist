const express = require("express")
const router = express.Router();
const EmployeeModel = require('../modules/Employee')
const bcrypt = require("bcryptjs")

router.get('/getUserData', (req, res) => {
    EmployeeModel.find()
        .then(users => {
            const userData = users.map(user => ({
                name: user.name,
                email: user.email
            }));
            res.json(userData);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.post("/login",async (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Return the user's name and email along with the success status
                    res.json({ status: "success", message: "Login successful", user: { name: user.name, email: user.email } });
                } else {
                    res.json({ status: "incorrect_password", message: "The password is incorrect" });
                }
            } else {
                res.json({ status: "user_not_found", message: "The user is not registered" });
            }
        })
    //     .catch(err => res.json({ status: "error", message: "An error occurred during login", error: err }));
    // try {
    //     const { email, password } = req.body;

    //     const userExist = await EmployeeModel.findOne({email });
    //     console.log(userExist);

    //     if(!userExist) {
    //         return res.status(400).json({message: "Invalid Credentials"});
    //     }

    //     //const user = await bcrypt.comapre(password, userExist.password);
    //     const user = await userExist.comparePassword(password);

    //     if(user) {
    //         res.status(200).json({
    //             msg: "login Succesful",
    //             token: await userExist.generateToken(),
    //             userId: userExist._id.toString(),
    //         })
    //     } else {
    //         res.status(401).json({message: "Invalid email or Password"})
    //     }
    // } catch (error) {
    //     res.status(500).json("Internal server error") 
    // }
});

router.post('/register', async(req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))

    // try {
    //     const {name, email, password} = req.body;
    //     const userExit = await UserActivation.findOne({email});
    //     if (userExit) {
    //         return res.status(400).json({ msg : "email already exist"})
    //     }

    //     const saltRound = 10;
    //     const hash_password = await bcrypt.hash(password, saltRound)
         
    //     const userCreated = await EmployeeModel.create({name,email, password: hash_password});

    //     res.status(201).json({msg : userCreated, token: await userCreated.generateToken(), userId: userCreated._id >this.toString(),});
    // } catch(error) {
    //     res.status(500).json("internal server error")
    // }


})

module.exports = router;