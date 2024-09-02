const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./modules/Employee')

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://bloggist-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

app.get('/getUser', (req, res) => {
    const userId = req.query.id;  // Get the user ID from the query

    EmployeeModel.findById(userId, 'name email')  // Retrieve only the name and email fields
        .then(user => {
            if (user) {
                res.json(user);  // Send back the user data
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "success", message: "Login successful" });
                } else {
                    res.json({ status: "incorrect_password", message: "The password is incorrect" });
                }
            } else {
                res.json({ status: "user_not_found", message: "The user is not registered" });
            }
        })
        .catch(err => res.json({ status: "error", message: "An error occurred during login", error: err }));
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})

