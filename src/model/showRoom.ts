import mongoose, { model, Schema } from "mongoose";
//import {db} from "../config/database.config";
import { timeStamp } from "console";

export interface IMovies {
    title:  string,
    description : string,
    image: string,
    price: number

}

const MovieInstance = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user:
      {
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
      }
    
    
  },
  { timestamps: true }
);

  export const Movies = mongoose.model<IMovies>("movie", MovieInstance);


//Relationship


