// Import necessary modules and dependencies
import express from "express";
import BlogController from "../Blogs/blog.controller.js";


// Create an instance of the Express router
const router = express.Router();
const blogController = new BlogController()

// Define a route to render the "blog" view
router.get('/', async (req, res) => {
    blogController.getAllBlogs(req,res)
});

// Export the router for use in your main server file
export default router;
