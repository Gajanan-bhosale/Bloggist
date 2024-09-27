const Products = require('../modules/Post');
const mongoose = require('mongoose');


// Fetch all posts
const get_all_posts = async (req, res) => {
    try {
        const posts = await Products.find().select('-userId');
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ message: 'Server error' });
    }
};

const add_post = function (req, res) {
    console.log(req.body);
    const thumbnail = req.file.path;
    const title = req.body.title;
    const category = req.body.category;
    const content = req.body.content;

    // Ensure userId is a valid ObjectId
    let userId;
    try {
        userId = new mongoose.Types.ObjectId(req.body.userId); // Use 'new' keyword here
    } catch (error) {
        return res.status(400).send({ message: 'Invalid User ID' }); // Handle invalid userId format
    }

    const product = new Products({ thumbnail, title, category, content, userId });

    product.save()
        .then((savedPost) => {
            console.log('Post saved with ID:', savedPost._id); // Debugging log to confirm save
            res.status(201).send({ message: 'Post saved successfully.', postId: savedPost._id });
        })
        .catch((error) => {
            console.error('Error saving post:', error);
            res.status(500).send({ message: 'Server error' });
        });
};


// Add a new post
// const add_post = async (req, res) => {
//     try {
//         // Validate if userId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
//             return res.status(400).json({ message: 'Invalid User ID' });
//         }

//         const thumbnail = req.file.path;
//         const title = req.body.title;
//         const category = req.body.category;
//         const content = req.body.content;
//         const userId = mongoose.Types.ObjectId(req.body.userId); // Cast to ObjectId

//         const product = new Products({ thumbnail, title, category, content, userId });

//         const savedPost = await product.save();
//         console.log('Post saved with ID:', savedPost._id);
//         res.status(201).send({ message: 'Post saved successfully.', postId: savedPost._id });
//     } catch (error) {
//         console.error('Error saving post:', error);
//         res.status(500).send({ message: 'Server error' });
//     }
// };


const get_blog_post = async (req, res) => {
    const postId = req.params.id;

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid Post ID' });
    }

    try {
        const post = await Products.findById(postId).populate('userId', 'name'); // Populate user info
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const get_user_posts = async (req, res) => {
    const { userId } = req.query;
    try {
        const posts = await Products.find({ userId });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ message: 'Server error' });
    }
};


const update_post = async (req, res) => {
    const postId = req.params.id;
    const { title, category, content, thumbnail } = req.body;

    try {
        const post = await Products.findByIdAndUpdate(
            postId,
            { title, category, content, thumbnail },
            { new: true }
        );

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.send({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send({ message: 'Server error' });
    }
};


const delete_post = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Products.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.send({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Server error' });
    }
};


const add_comment = async (req, res) => {
    const postId = req.params.id;
    const { fullName, commentText } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid Post ID' });
        }


        const post = await Products.findById(postId).select('-userId');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }


        const newComment = {
            fullName,
            commentText,
            date: new Date()
        };


        post.comments.push(newComment);


        await post.save();

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const get_comments = async (req, res) => {
    const postId = req.params.id;


    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid Post ID' });
    }

    try {

        const post = await Products.findById(postId).select('comments');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { add_post, get_user_posts, get_all_posts, update_post, delete_post, get_blog_post, add_comment, get_comments };
