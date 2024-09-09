const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({
    image:{type: Object, require:true},
    title: {type: String, require:true},
    category: {type: String, require:true},
    date: {type:Number, require: true}
})

const BlogsModel = mongoose.model("blogs", BlogsSchema)
module.export = BlogsModel