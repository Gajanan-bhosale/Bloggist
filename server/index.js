const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./modules/Employee')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://bloggist-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

const JWT_SECRET = 'userData'; 

mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

app.get('/getUser', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        EmployeeModel.findById(decoded.userId)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
                    res.json({ status: "success", token });
                } else {
                    res.json({ status: "incorrect_password", message: "The password is incorrect" });
                }
            } else {
                res.json({ status: "user_not_found", message: "The user is not registered" });
            }
        })
        .catch(err => res.json({ status: "error", message: "An error occurred during login", error: err }));
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await EmployeeModel.create({ name, email, password: hashedPassword });

        
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

app.listen(3001, () => {
    console.log("server is running")
})

