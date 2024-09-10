const mongoose = require("mongoose")
const URI = process.env.MONGODB_URI;
mongoose.connect(URI)

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection succesfulfor data base")
    }catch (error) {
        console.error("Database Connection failed")
        process.exit(0)
    }
};

module.exports = connectDb;