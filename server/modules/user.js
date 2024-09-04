const mongoose = require("mongoose")
const jwt = require("jsonwentoken");
const Joi = reuire('joi')
const passwordComplexicity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    Name:{type :String, require:true},
    email: {type: string, require:true},
    password: {type:String, require:true}
});

userSchema.methods.generateAuthToken =function() {
    const token =jwt.sign =({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}

const User = mongoose.model("user", userSchema);

const validate =(data) =>{
    const schema = Joi.object({
        name: Joi.string().require().label("Name"),
        email: Joi.string().require().label("Email"),
        password: passwordComplexicity().require().label("Password"),
    });
    return schema.validate(data)
};

module.exports = {User, validate}