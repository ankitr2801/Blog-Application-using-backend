
import express from "express";
import BlogController from "./blog.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";


const blogRouter = express.Router();


const blogController = new BlogController();

blogRouter.get("/", (req, res) => {
    blogController.getAllBlogs(req, res)
})

blogRouter.get("/add", (req, res) => {
    blogController.getAddBlogForm(req, res)
})

blogRouter.post("/createBlogs", upload.single('imageUrL'), (req, res, next) => {
    blogController.createBlog(req, res, next)
})

blogRouter.get("/updatedblogs/:id", (req, res) => {
    blogController.getUpdateForm(req, res);
});


blogRouter.post("/deleteBlogs/:id", (req, res) => {
    blogController.deleteBlogs(req, res);
});





export default blogRouter;