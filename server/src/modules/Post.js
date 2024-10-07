const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    thumbnail: { type: String }, // No need to specify required: false
    title: { type: String },
    category: { type: String },
    content: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId }, // No longer required
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
