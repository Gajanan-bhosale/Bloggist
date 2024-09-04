const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:{type :String, require:true},
    email: {type: string, require:true},
    password: {type:String, require:true}
})

const EmployeeModel = mongoose.model("employee", EmployeeSchema)
module.exports = EmployeeModel