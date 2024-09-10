const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const EmployeeSchema = new mongoose.Schema({
    name:{type :String, require:true},
    email: {type: String, require:true},
    password: {type:String, require:true}
})

EmployeeSchema.methods.comparePassword = async function(password){
    return bcrypt.comapre(password, this.password);
}

EmployeeSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECURITY_KEY,{
            expireIn: "30d",
        }
    )
    } catch (error) {
        console.error(error);
    }
};

const EmployeeModel = mongoose.model("employee", EmployeeSchema)
module.exports = EmployeeModel