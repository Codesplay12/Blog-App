const express = require("express");
const { getAllBlogsController, createBlogController, updateBlogController, getBlogIdController, deleteBlogController, userBlogController } = require("../controllers/blogController");

const router = express.Router();

// GET  || All blogs
router.get("/all-blog",getAllBlogsController)


//POST || CREATE BLOG
router.post("/create-blog",createBlogController)


// PUT || UPDATE BLOG
router.put("/update-blog/:id",updateBlogController)


//GET || Single Blog details
router.get("/get-blog/:id",getBlogIdController)

//DELETE || delete blog
router.delete("/delete-blog/:id",deleteBlogController)

//GET || user blog
router.get("/user-blog/:id",userBlogController)

module.exports = router;

 