const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('./modules/Employee');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://bloggist-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'myData', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = await EmployeeModel.create({ name, email, password: hashedPassword });
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ status: "success", message: "Login successful", token });
        } else {
            res.json({ status: "error", message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected Route
app.get('/getUserData', authenticateToken, async (req, res) => {
    try {
        const user = await EmployeeModel.findById(req.user._id);
        if (user) {
            res.json({ name: user.name, email: user.email });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("server is running");
});
