
import mongoose, { Schema, model } from "mongoose";
import { Movies} from "./showRoom";

export interface UserInfo {

  fullname: string,
  username: string,
  email: string,
  password: string
}

 const UserInstance = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies:[
    {
      type : mongoose.Schema.Types.ObjectId,
      ref:'movie'
    }
  ]
  
},
  { timestamps: true}
);

export const User = mongoose.model<UserInfo>("user", UserInstance);
