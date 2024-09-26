const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
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
