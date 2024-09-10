require("dotenv").config();
const express = require("express")
const cors = require("cors")
const router = require("./router/auth-router")
const connectDb = require('./utils/db')

const app = express()
app.use(express.json())
const corsOptions = {
    origin: 'https://bloggist-frontend.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use("/api/auth",router)




// mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');



// app.get('/getUserData', (req, res) => {
//     EmployeeModel.find()
//         .then(users => {
//             const userData = users.map(user => ({
//                 name: user.name,
//                 email: user.email
//             }));
//             res.json(userData);
//         })
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     EmployeeModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     // Return the user's name and email along with the success status
//                     res.json({ status: "success", message: "Login successful", user: { name: user.name, email: user.email } });
//                 } else {
//                     res.json({ status: "incorrect_password", message: "The password is incorrect" });
//                 }
//             } else {
//                 res.json({ status: "user_not_found", message: "The user is not registered" });
//             }
//         })
//         .catch(err => res.json({ status: "error", message: "An error occurred during login", error: err }));
// });

// app.post('/register', (req, res) => {
//     EmployeeModel.create(req.body)
//         .then(employees => res.json(employees))
//         .catch(err => res.json(err))
// })
connectDb().then(() =>{
app.listen(3001, () => {
    console.log("server is running")
})
})


