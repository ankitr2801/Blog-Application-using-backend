import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";

const UserModel = mongoose.model('User', userSchema);

class UserRepository {
  async SignUp(name, email, password) {
    try {
    
      const result = await UserModel.create({name, email, password}); // Use create method directly
      const savedSignUp = await result.save();
      return savedSignUp;
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error("Something went wrong");
    }
  }

  async SignInRepo(email) {
    try {
      const result = await UserModel.findOne({ email });
      // console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }


}

export default UserRepository;
