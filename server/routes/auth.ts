import { RequestHandler } from "express";
import { User } from "../models/User";
import { connectToDatabase } from "../db";

interface AuthRequest {
  name?: string;
  email: string;
  password: string;
}

// Simple in-memory token store for development
let tokenStore: Map<string, { userId: string; expires: number }> = new Map();

const generateToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const registerUser: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { name, email, password } = req.body as AuthRequest;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password, // In production, hash this with bcrypt
    });

    const token = generateToken();
    tokenStore.set(token, {
      userId: newUser._id.toString(),
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { email, password } = req.body as AuthRequest;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Find user
    const user = await User.findOne({ email, password });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken();
    tokenStore.set(token, {
      userId: user._id.toString(),
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token required" });
      return;
    }

    const tokenData = tokenStore.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    const user = await User.findById(tokenData.userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
