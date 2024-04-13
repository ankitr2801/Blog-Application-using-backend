
import mongoose from "mongoose";
const url = "mongodb://localhost:27017/BlogApps";

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    } catch (err) {
        console.log("Error while connecting to db");
        console.log(err);
    }
}