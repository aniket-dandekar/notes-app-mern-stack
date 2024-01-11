import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { body, validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import fetchUser from "../middleware/middleware";

const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      }; // Add the 'user' property to the 'Request' object
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1 :
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
    let success = false;
    // Check and return Validations if errors present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if user exists
      let userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      // Encrypting / Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Creating user
      const createUser = await User.create({
        name,
        email,
        password: secPass,
      });

      // Sending authtoken
      const data = {
        user: {
          id: createUser.id,
        },
      };

      const authToken = JWT_SECRET && jsonwebtoken.sign(data, JWT_SECRET);

      success = true;

      res.json({ success, authToken });
    } catch (error) {
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

// ROUTE 2 :
// Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req: Request, res: Response) => {
    let success = false;

    // Check and return Validations if errors present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      let userExist = await User.findOne({ email: email });
      if (!userExist) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      // Authenticating user
      const passwordCompare = await bcrypt.compare(
        password,
        userExist.password!
      );
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      // Sending authtoken after verification
      const data = {
        user: {
          id: userExist.id,
        },
      };

      const authToken = JWT_SECRET && jsonwebtoken.sign(data, JWT_SECRET);

      success = true;

      res.json({ success, authToken });
    } catch (error) {
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

// ROUTE 3 :
// Get loggged in user details: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",
  fetchUser,
  async (req: Request, res: Response, next: NextFunction) => {
    let success = false;
    try {
      //   const authToken = jsonwebtoken.sign(data, JWT_SECRET);
      const userId = req.user!.id;
      const user = await User.findById(userId).select("-password");
      success = true;

      res.json({ success, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

export default router;
