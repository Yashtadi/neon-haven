import { RequestHandler } from "express";
import { promises as fs } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "data");
const usersFile = join(dataDir, "users.json");
const tokensFile = join(dataDir, "tokens.json");

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface AuthRequest {
  name?: string;
  email: string;
  password: string;
}

// Simple in-memory token store for development
let tokenStore: Map<string, { userId: string; expires: number }> = new Map();

const generateToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const generateUserId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const ensureDataDir = async () => {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory may already exist
  }
};

const readUsers = async (): Promise<User[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users: User[]): Promise<void> => {
  await ensureDataDir();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as AuthRequest;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    const users = await readUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const newUser: User = {
      _id: generateUserId(),
      name,
      email,
      password, // In production, hash this with bcrypt
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    const token = generateToken();
    tokenStore.set(token, { userId: newUser._id, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 });

    res.json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as AuthRequest;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const users = await readUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken();
    tokenStore.set(token, { userId: user._id, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
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

    const users = await readUsers();
    const user = users.find((u) => u._id === tokenData.userId);

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
    res.status(500).json({ error: "Internal server error" });
  }
};
