import { RequestHandler } from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";
import { connectToDatabase } from "../db";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderRequest {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

const getTokenUserId = (req: any): string | null => {
  return req.headers["x-user-id"] || null;
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { items, subtotal, discount, shipping, total, deliveryAddress, paymentMethod } = req.body as OrderRequest;
    const userEmail = getTokenUserId(req);

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Items are required" });
      return;
    }

    if (!deliveryAddress || !paymentMethod) {
      res.status(400).json({ error: "Delivery address and payment method are required" });
      return;
    }

    // Find user by email
    let userId = null;
    if (userEmail) {
      const user = await User.findOne({ email: userEmail });
      userId = user ? user._id : null;
    }

    const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const newOrder = await Order.create({
      userId,
      items,
      subtotal,
      discount,
      shipping,
      total,
      status: "pending",
      deliveryDate,
      deliveryAddress,
      paymentMethod,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const userEmail = getTokenUserId(req);

    if (!userEmail) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Find user
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const orders = await Order.find({ userId: user._id });

    res.json({
      orders,
      total: orders.length,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { id } = req.params;
    const userEmail = getTokenUserId(req);

    if (!userEmail) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Find user
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const order = await Order.findOne({ _id: id, userId: user._id });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
