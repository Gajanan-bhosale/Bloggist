const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    thumbnail: { type: String, required: "*" },
    title: { type: String, required: "*" },
    category: { type: String, required: "*" },
    content: { type: String, required: "*" },
    userId: { type: mongoose.Schema.Types.ObjectId, required: "*" }, 
    date: { type: Date, default: Date.now },
    comments: [
        {
            fullName: String,
            commentText: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

const Products = mongoose.model("Products", PostSchema);
module.exports = Products;
