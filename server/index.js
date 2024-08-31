const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./modules/Employee')

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://bloggist-frontend.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

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

