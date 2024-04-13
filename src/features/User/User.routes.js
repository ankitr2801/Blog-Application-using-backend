import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

// Register routes



userRouter.get("/SignUp", (req, res) => {
 res.render("register");
});

userRouter.post("/SignUp", (req, res) => {
  userController.SignUp(req, res);
});

// Login routes
userRouter.get("/SignIn", (req, res) => {
  res.render("login", { title: "Login"});
});

userRouter.post("/SignIn", (req, res) => {
  userController.SignIn(req, res);
});

// Logout route
userRouter.get("/logOut", (req, res) => {
  userController.logOut(req, res);
});

export default userRouter;
