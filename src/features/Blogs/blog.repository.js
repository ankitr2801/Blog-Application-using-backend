import mongoose from "mongoose";
import { blogSchema } from "./blog.Schema.js";

const blogModel = mongoose.model('Blog', blogSchema);

class BlogRepository {
  async createBlog(title, author, content, rating, imageUrL) {
    try {
      const result = await blogModel.create({ title, author, content, rating, imageUrL });
      const saveBlog = await result.save();
      return saveBlog;
    } catch (err) {
      console.error("Error creating blog:", err);
      return { success: false, error: err.message || "Something went wrong" };
    }
  }

  async getAll() {
    const blogs = await blogModel.find();
    return blogs;
  }

  async getById(id) {
    const blogs = await blogModel.findById(id)
    console.log("BLOGS" , blogs);
    return blogs;
  }

  async delete(id) {
    const isDeleted = await blogModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    return isDeleted;
  }
}

export default BlogRepository;
