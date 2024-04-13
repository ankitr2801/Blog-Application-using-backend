//Importing required modules
import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import {  connectUsingMongoose } from "./src/config/mongoose.js";
import userRouter from "./src/features/User/User.routes.js";
import blogRouter from "./src/features/Blogs/blog.routes.js";
import Router from "./src/features/Router/routes.js";
import jwtAuth from "./src/middleware/jwtAuth.js";

// Create Express server instance
const server = express();

// Set EJS as the view engine
server.set('view engine', 'ejs');

// Set the views directory
// In your Express server setup
server.set("views", path.join(process.cwd(), 'src', 'views'));
// server.use(express.static(path.join(process.cwd(), 'public')));
server.use('/Uploads', express.static('Uploads'));
server.use(express.json());

// Middleware for parsing form data
server.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
server.use(express.static('public'));

// Use express-ejs-layouts for layout support
server.use(expressLayouts);
server.set('layout', 'layout');


server.use("/",  Router);
server.use("/api/users",  userRouter);
server.use("/api/blogs" ,  blogRouter);

// Start server and listen on port 3200
server.use(express.static('src/views'));

const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
    // connectToMongoDB();
    connectUsingMongoose();
});

