require("dotenv").config();
const express = require("express")
const cors = require("cors")
const authrouter = require("./src/router/auth-router")
const postrouter = require("./src/router/post-route")
const connectDb = require('./src/utils/db');
const path = require('path')
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

//   const upload = multer({ storage: storage })


const app = express()
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const corsOptions = {
    // origin: 'http://localhost:5173',
    origin: 'https://bloggist-frontend.vercel.app/', 
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
}
app.use(cors(corsOptions));

app.use("/api/auth",authrouter)
app.use("/api/post",postrouter)



connectDb().then(() =>{
app.listen(5000, () => {
    console.log("server is running")
})
})





































// mongoose.connect('mongodb+srv://gajananbhosale902152:wTn5MO29AiEJq9ne@bloggist.t5qjx.mongodb.net/?retryWrites=true&w=majority&appName=Bloggist');

// origin: 'https://bloggist-frontend.vercel.app',

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