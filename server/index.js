const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./modules/Employee')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://bloggist-chi.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
}))

mongoose.connect('mongodb://127.0.0.1:27017/employee');

app.get('/getUser', (req,res) => {
    EmployeeModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                }
                else {
                    res.json("the password is incorrect")
                }
            }
            else {
                res.json("the user is not register")
            }
        })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})

