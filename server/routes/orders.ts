import { RequestHandler } from "express";
import { promises as fs } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "data");
const ordersFile = join(dataDir, "orders.json");

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  deliveryDate: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  createdAt: string;
}

const ensureDataDir = async () => {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory may already exist
  }
};

const readOrders = async (): Promise<Order[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(ordersFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeOrders = async (orders: Order[]): Promise<void> => {
  await ensureDataDir();
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
};

const generateOrderId = (): string => {
  return Date.now().toString(36).toUpperCase();
};

const getTokenUserId = (req: any): string | null => {
  const token = req.headers.authorization?.split(" ")[1];
  // For now, we'll use a simple approach - in production use JWT verification
  return req.headers["x-user-id"] || null;
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { items, subtotal, discount, shipping, total, deliveryAddress, paymentMethod } = req.body;
    const userId = getTokenUserId(req) || "anonymous";

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Items are required" });
      return;
    }

    if (!deliveryAddress || !paymentMethod) {
      res.status(400).json({ error: "Delivery address and payment method are required" });
      return;
    }

    const newOrder: Order = {
      _id: generateOrderId(),
      userId,
      items,
      subtotal,
      discount,
      shipping,
      total,
      status: "pending",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      deliveryAddress,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const orders = await readOrders();
    orders.push(newOrder);
    await writeOrders(orders);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const userId = getTokenUserId(req);

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const orders = await readOrders();
    const userOrders = orders.filter((o) => o.userId === userId);

    res.json({
      orders: userOrders,
      total: userOrders.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getTokenUserId(req);

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const orders = await readOrders();
    const order = orders.find((o) => o._id === id && o.userId === userId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
