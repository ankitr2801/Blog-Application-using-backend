import BlogRepository from "./blog.repository.js";

export default class BlogController {
  constructor() {
    this.blogRepository = new BlogRepository();
  }

  async getAllBlogs(req, res, next) {
    try {
      const blogs = await this.blogRepository.getAll();
      res.render('blog', { Blogs: blogs }); // Pass the 'Blogs' variable to the template
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }

  async createBlog(req, res) {
    try {
      const { title, author, content, rating } = req.body;
      const imageUrL = req.file.filename;
      const createdBlog = await this.blogRepository.createBlog(
        title,
        author,
        content,
        rating,
        imageUrL
      );
      const blogs = await this.blogRepository.getAll();
      return res.render('blog', { Blogs: blogs });
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }

  async getAddBlogForm(req,res , next){
    await res.render('addBlogs')
  }

  async getUpdateForm(req, res, next) {
    const {id} = req.params
    console.log('ID' ,id);
    const blogFound = await this.blogRepository.getById(id)
    console.log("BLOGFOUND", blogFound);
    if (blogFound) { 
    return res.render('update')
    } else {
      res.status(401).send("blogs not found")
    }
  }

  async deleteBlogs(req, res) {
    const id = req.params.id;
    const isDeleted = await this.blogRepository.delete(id)
    if (!isDeleted) {
      res.status(401).send("blog not found")
    } else {
      const blogs = await this.blogRepository.getAll();
      return res.render('blog', { Blogs: blogs });
    }
  }

}
