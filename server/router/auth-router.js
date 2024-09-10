const express = require("express")
const router = express.Router();
const EmployeeModel = require('../modules/Employee')
const bcrypt = require("bcryptjs")
const authcontrollers = require("../controllers/auth_controller")

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

router.route("/login").post(authcontrollers.login);
    
router.route("/register").post(authcontrollers.register)




module.exports = router;


























// EmployeeModel.create(req.body)
    //     .then(employees => res.json(employees))
    //     .catch(err => res.json(err))

























// const { email, password } = req.body;
    // EmployeeModel.findOne({ email: email })
    //     .then(user => {
    //         if (user) {
    //             if (user.password === password) {
    //                 // Return the user's name and email along with the success status
    //                 res.json({ status: "success", message: "Login successful", user: { name: user.name, email: user.email } });
    //             } else {
    //                 res.json({ status: "incorrect_password", message: "The password is incorrect" });
    //             }
    //         } else {
    //             res.json({ status: "user_not_found", message: "The user is not registered" });
    //         }
    //     })
    //     .catch(err => res.json({ status: "error", message: "An error occurred during login", error: err }));
    