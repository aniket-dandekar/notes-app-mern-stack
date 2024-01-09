import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

// Define an interface to represent the structure of your JWT payload
interface DecodedToken {
  user: {
    id: string;
  };
}

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

const fetchUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data =
      token &&
      JWT_SECRET &&
      (jsonwebtoken.verify(token, JWT_SECRET) as DecodedToken);
    if (!data || typeof data !== "object" || !("user" in data)) {
      throw new Error("Invalid token structure");
    }
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
