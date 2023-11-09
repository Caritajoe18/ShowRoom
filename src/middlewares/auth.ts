import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "../model/user";

const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: " Invalid token, kindly sign in as a user",
    });
  }
  const token = authorization.slice(7, authorization.length);

  let verified = jwt.verify(token, jwtsecret);

  if (!verified) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
  const { _id } = verified as { [key: string]: string };
  // check if user exists

  const user = await User.findById(_id)

  if(!user){
    return res.status(401).json({
        error: "kindly sign up as a user",
      });
  }

  req.user = verified;
  next()
}
