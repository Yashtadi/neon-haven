import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Auth and product routes
import { registerUser, loginUser, getProfile } from "./routes/auth";
import { getProducts, getProductById } from "./routes/products";
import { getOrders, getOrderById, createOrder } from "./routes/orders";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
  app.get("/api/auth/profile", getProfile);

  // Product routes
  app.get("/api/products", getProducts);
  app.get("/api/products/:id", getProductById);

  // Order routes
  app.get("/api/orders", getOrders);
  app.get("/api/orders/:id", getOrderById);
  app.post("/api/orders", createOrder);

  return app;
}
