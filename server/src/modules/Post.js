const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    thumbnail: String,
    title: String,
    category: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedAt: { type: Date, default: Date.now }, // Store time of posting
    comments: [{ fullName: String, commentText: String, date: Date }]
});


const Products = mongoose.model("Products", PostSchema);
module.exports = Products;
