const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs/dist/bcrypt');

const EmployeeSchema = new mongoose.Schema({
    name:{type :String, require:true},
    email: {type: String, require:true},
    password: {type:String, require:true}
})

EmployeeSchema.pre("save", async function(next){
    console.log("pre method", this);
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.has(user.password, saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
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
            expiresIn: "30d",
        }
    )
    } catch (error) {
        console.error(error);
    }
};

const EmployeeModel = new mongoose.model("employee", EmployeeSchema)
module.exports = EmployeeModel;