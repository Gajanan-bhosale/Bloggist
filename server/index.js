const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./modules/Employee')

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://majestic-marzipan-e50fd2.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

app.get('/getUserData', (req, res) => {
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

app.post("/login", (req, res) => {
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

