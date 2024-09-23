import { Request, Response, NextFunction } from "express";
import Users from "../models/usermodel";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  const { fullname, username, email, phoneno, password } = req.body;
  const user = new Users({
    fullname,
    username,
    email,
    phoneno,
    password,
  });

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userExists = await Users.findOne({ username });
    if (!userExists) {
      return res.json({ message: "User not found" });
    }

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: error.message });
    } else {
      res.json({ message: "An unknown error occurred" });
    }
  }
};
