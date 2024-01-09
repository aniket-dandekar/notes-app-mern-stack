import express, { Request, Response } from "express";

import { body, validationResult } from "express-validator";

import User from "../models/User";
import { error } from "console";

const router = express.Router();

// Create new user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req: Request, res: Response) => {
    // Check and return Validations if errors present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if user exists
      let userExist = await User.findOne({ email: email });
      if (userExist) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // Creating user
      const createUser = await User.create({
        name,
        email,
        password,
      });
      // if(createUser) res.send("Success!'")
      //   .then((user) => res.json(user))
      //   .catch((error) => {
      // res.json({ error });
      //   });
    } catch (error) {
      res.status(500).send("Some error occurred");
    }
  }
);

export default router;
