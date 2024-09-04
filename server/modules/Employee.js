const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:{type :String, require:true},
    email: {type: String, require:true},
    password: {type:String, require:true}
})

const EmployeeModel = mongoose.model("employee", EmployeeSchema)
module.exports = EmployeeModel