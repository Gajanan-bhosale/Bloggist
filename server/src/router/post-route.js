const express = require("express")
const router = express.Router();
const Post_controller = require("../controllers/Post_controller")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  router.route("/add_post").post(upload.single('thumbnail'), (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
    }
    next();
}, Post_controller.add_post);
router.route("/get_posts/:id").get(Post_controller.get_user_posts);
router.route("/get_blog_post/:id").get(Post_controller.get_blog_post);
router.route("/get_all_posts").get(Post_controller.get_all_posts);
router.route("/update_post/:id").put(upload.single('thumbnail'), Post_controller.update_post);
router.route("/delete_post/:id").delete(Post_controller.delete_post);
router.route("/add_comment/:id").post(Post_controller.add_comment);
router.route("/get_comments/:id").get(Post_controller.get_comments);


module.exports = router;