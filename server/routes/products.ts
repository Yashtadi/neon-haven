import { RequestHandler } from "express";
import { Product } from "../models/Product";
import { connectToDatabase } from "../db";

export const getProducts: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { category, search } = req.query;

    let query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { scientificName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query);

    res.json({
      products,
      total: products.length,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    await connectToDatabase();

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
