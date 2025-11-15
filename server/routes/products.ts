import { RequestHandler } from "express";

interface Product {
  _id: string;
  name: string;
  scientificName: string;
  price: number;
  image: string;
  category: string;
  description: string;
  light: string;
  water: string;
  difficulty: string;
  benefits: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    _id: "1",
    name: "Money Plant",
    scientificName: "Epipremnum aureum",
    price: 299,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "The miraculous Money Plant is believed to bring prosperity according to Vastu Shastra. Perfect for Indian homes with its trailing vines and heart-shaped leaves. Thrives in Indian climate.",
    light: "bright indirect",
    water: "low water",
    difficulty: "easy",
    benefits: ["Vastu compliant", "Air purifying", "Very forgiving", "Easy to propagate"],
    inStock: true,
  },
  {
    _id: "2",
    name: "Rubber Plant (Ficus)",
    scientificName: "Ficus elastica",
    price: 599,
    image: "https://images.unsplash.com/photo-1566969687620-e83ab8d22b46?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "Native to India! This stunning plant with large, glossy leaves thrives in our climate and makes a bold statement piece in living rooms and corners.",
    light: "bright indirect",
    water: "medium water",
    difficulty: "medium",
    benefits: ["Native to India", "Air purifying", "Heat tolerant", "Statement piece"],
    inStock: true,
  },
  {
    _id: "3",
    name: "Snake Plant (Sansevieria)",
    scientificName: "Sansevieria trifasciata",
    price: 399,
    image: "https://images.unsplash.com/photo-1624244261111-9f59b0f3c67d?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "NASA-recommended air purifier! Perfect for Indian homes, this graceful palm removes toxins, adds humidity to dry air-conditioned rooms, and is Vastu compliant.",
    light: "low light",
    water: "low water",
    difficulty: "easy",
    benefits: ["NASA certified", "Vastu approved", "Adds humidity", "Non toxic to pets"],
    inStock: true,
  },
  {
    _id: "4",
    name: "Areca Palm",
    scientificName: "Dypsis lutescens",
    price: 799,
    image: "https://images.unsplash.com/photo-1599599810694-7edb58284a28?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "NASA-recommended air purifier! Perfect for Indian homes, this graceful palm removes toxins, adds humidity to dry air-conditioned rooms, and is Vastu compliant.",
    light: "medium light",
    water: "medium water",
    difficulty: "medium",
    benefits: ["NASA certified", "Vastu approved", "Adds humidity", "Non toxic to pets"],
    inStock: true,
  },
  {
    _id: "5",
    name: "Jade Plant (Crassula)",
    scientificName: "Crassula ovata",
    price: 249,
    image: "https://images.unsplash.com/photo-1605773527852-2e1a0aad5eb7?w=400&h=400&fit=crop",
    category: "Gifting",
    description: "Symbol of prosperity and good fortune in Indian culture. Perfect gift for housewarming. Low maintenance succulent that thrives in bright indoor spaces.",
    light: "bright light",
    water: "low water",
    difficulty: "easy",
    benefits: ["Prosperity symbol", "Low maintenance", "Perfect gift", "Bright indirect light"],
    inStock: true,
  },
  {
    _id: "6",
    name: "Peace Lily (Spathiphyllum)",
    scientificName: "Spathiphyllum wallisii",
    price: 449,
    image: "https://images.unsplash.com/photo-1585529237-33fbef3cdb23?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "Elegant white flowers brighten any space. Excellent air purifier, removes formaldehyde and xylene. Perfect for bedrooms and living rooms in Indian homes.",
    light: "low light",
    water: "medium water",
    difficulty: "easy",
    benefits: ["Air purifying", "Elegant flowers", "Bedroom friendly", "Removes toxins"],
    inStock: true,
  },
  {
    _id: "7",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    price: 199,
    image: "https://images.unsplash.com/photo-1593096922876-31e79e61eb29?w=400&h=400&fit=crop",
    category: "Gifting",
    description: "The miracle plant! Widely used in Indian households for medicinal and cosmetic benefits. Perfect for sunny balconies. Perfect for sunny balconies. Perfect for sunny balconies.",
    light: "bright light",
    water: "low water",
    difficulty: "easy",
    benefits: ["Medicinal gel", "Skin care", "Minimal watering", "Air purifying"],
    inStock: true,
  },
  {
    _id: "8",
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    price: 199,
    image: "https://images.unsplash.com/photo-1625922597893-94f6b3e37bcd?w=400&h=400&fit=crop",
    category: "Outdoor Plants",
    description: "Most forgiving plant! Perfect for beginners. Produces adorable baby plantlets. Excellent air purifier that thrives in Indian climate.",
    light: "medium light",
    water: "medium water",
    difficulty: "easy",
    benefits: ["Very forgiving", "Produces babies", "Air purifying", "Beginner friendly"],
    inStock: true,
  },
  {
    _id: "9",
    name: "ZZ Plant (Zamioculcas)",
    scientificName: "Zamioculcas zamiifolia",
    price: 549,
    image: "https://images.unsplash.com/photo-1625922597893-94f6b3e37bcd?w=400&h=400&fit=crop",
    category: "Office Plants",
    description: "Glossy, architectural beauty perfect for office spaces. Extremely low maintenance and drought tolerant. Thrives in low light conditions.",
    light: "low light",
    water: "low water",
    difficulty: "easy",
    benefits: ["Office friendly", "Drought tolerant", "Low light", "Modern look"],
    inStock: true,
  },
  {
    _id: "10",
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    price: 149,
    image: "https://images.unsplash.com/photo-1585519857529-fc7f045a9668?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "Cascading vines of heart-shaped leaves. Perfect for hanging baskets. Excellent air purifier that grows vigorously in Indian homes.",
    light: "medium light",
    water: "medium water",
    difficulty: "easy",
    benefits: ["Cascading growth", "Air purifying", "Very hardy", "Easy to propagate"],
    inStock: true,
  },
  {
    _id: "11",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    price: 899,
    image: "https://images.unsplash.com/photo-1604066945714-d88a3ed7e1fb?w=400&h=400&fit=crop",
    category: "XL Plants",
    description: "Trendy Swiss Cheese plant with iconic split leaves. Statement piece for large living rooms. Requires bright indirect light and moderate watering.",
    light: "bright indirect",
    water: "medium water",
    difficulty: "medium",
    benefits: ["Instagram worthy", "Large statement", "Split leaves", "Air purifying"],
    inStock: true,
  },
  {
    _id: "12",
    name: "Fern",
    scientificName: "Nephrolepis exaltata",
    price: 349,
    image: "https://images.unsplash.com/photo-1614613545308-eb5ed670a4be?w=400&h=400&fit=crop",
    category: "Indoor Plants",
    description: "Lush green fronds create a tropical vibe. Perfect for bathrooms and humid spaces. Excellent air purifier for Indian homes.",
    light: "medium light",
    water: "high water",
    difficulty: "medium",
    benefits: ["Tropical vibes", "High humidity", "Humidity lover", "Soft fronds"],
    inStock: true,
  },
];

export const getProducts: RequestHandler = (req, res) => {
  const { category, search } = req.query;

  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.scientificName.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
  }

  res.json({
    products: filtered,
    total: filtered.length,
  });
};

export const getProductById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p._id === id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(product);
};
