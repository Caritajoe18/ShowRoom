import { Request, Response, NextFunction } from "express";
import { registerUserSchema, loginUserSchema } from "../utils/utils";
import { option } from "../utils/utils";
import { User } from "../model/user";
import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET as string;

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password, confirm_password } = req.body;

    // validating with joi
    const validateUser = registerUserSchema.validate(req.body, option);
    console.log(validateUser);
    if (validateUser.error) {

      return res
        .status(400)
        .json({ Error: validateUser.error.details[0].message });
    }

    // generating salt for password hashing
    const passwordHash = await bcrpyt.hash(password, bcrpyt.genSaltSync());

    const exists = await User.findOne({ email });

    if (!exists) {
      const newUser = await User.create({
        fullname,
        username,
        email,
        password: passwordHash,
      });
      console.log(newUser);

      return res.status(201).json({
        msg: "user created successfully",
        newUser,
      });

      //return res.redirect("/Login")
      //}
    }
    return res.status(400).json({
      error: "User already exists",
    });

    //return res.render("/Register",{error: "Email already taken"})
  } catch (err) {
    console.log(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // validating with joi
    const validateUser = loginUserSchema.validate(req.body, option);

    if (validateUser.error) {
      return res
        .status(400)
        .json({ error: validateUser.error.details[0].message });
    }
    // geting user info to generate token

    const users = await User.findOne({ email });
    if (!users) return res.status(400).json({ error: "invalid credentials" });

    const { _id } = users;

    const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "14d" });

    const validUser = await bcrpyt.compare(password, users.password);

    if (validUser) {
      return res.status(201).json({
        msg: "user login successful",
        User,
        token,
      });
    }
    return res.status(400).json({
      error: "Invalid password",
    });
  } catch (err) {
    console.log(err);
  }
}
