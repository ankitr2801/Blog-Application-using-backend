import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getSignUp(req,res){
    await res.render( 'register', { title: "Register" })
  }
  async getLogIn(req,res){
    await res.render( "login", { title: "Login" })
  }

  async SignUp(req, res) {
    const { name, email, password } = req.body
    // console.log(req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      await this.userRepository.SignUp(name, email, hashedPassword);
      // Redirect to the login page on successful signup
      res.redirect("/logIn");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create a new SignUp" });
    }
  }

  async SignIn(req, res, next) {
    try {
      // 1. Find user by email.
      console.log('REQBODY' ,req.body);
      const userEmail = req.body.email;
      console.log(userEmail);
      const user = await this.userRepository.SignInRepo(userEmail);
      const result = await bcrypt.compare(req.body.password, user.password);
      console.log("result", result);
      if (result) {
        const token = jwt.sign(
          {
            userID: user._id,
            email: user.email,
          },
          'WL5Fuf1RO83WCiEsP9VcNnYMEYGBiTP7',
          {
            expiresIn: "1h",
          }
        );
        res.cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
        return res.redirect(`/`);
      } else {
        return res.status(400).send("Incorrect Credentials");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async logOut(req, res, next) {
    res.clearCookie('jwtToken');
    res.redirect('/logIn')
  }
}
