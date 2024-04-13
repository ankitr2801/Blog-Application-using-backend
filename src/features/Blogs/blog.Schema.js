

import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imageUrL: {
    type: String,
    required: true,
  },
  
});




