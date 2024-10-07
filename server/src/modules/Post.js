const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    thumbnail: { type: String, required: false },
    title: { type: String, required: false },
    category: { type: String, required: false },
    content: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // User reference
    date: { type: Date, default: Date.now }, // Assuming there's a User model
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
