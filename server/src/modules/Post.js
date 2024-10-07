const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    thumbnail: { type: String, required: false }, // Make sure this is not required
    title: { type: String, required: false },     // Make sure this is not required
    category: { type: String, required: false },  // Make sure this is not required
    content: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: false }, 
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
