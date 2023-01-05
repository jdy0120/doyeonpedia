import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }
    const secretKey = process.env.JWT_SECRET;
    const verified = secretKey
      ? jwt.verify(token, secretKey)
      : new Error("Cannot find JWT_SECRETKEY");
    req.body.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
