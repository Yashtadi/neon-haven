ex items-center gap-2 text-primary hover:gap-3 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let added = false;

    for (let i = 0; i < quantity; i++) {
      const existingItem = cart.find((item: any) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
        added = true;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Product not found</p>
          <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/shop" className="fl

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-muted rounded-xl overflow-hidden h-96 md:h-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badge */}
              <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-4">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>

              {/* Title & Price */}
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.scientificName}</p>
              <p className="text-4xl font-bold text-primary mb-6">₹{product.price}</p>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              {/* Care Requirements */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl mb-2">☀️</div>
                  <p className="text-sm font-semibold capitalize">{product.light}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💧</div>
                  <p className="text-sm font-semibold capitalize">{product.water}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-sm font-semibold capitalize">{product.difficulty}</p>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 gap-2 transition ${
                    added ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    "🛒 Add to Cart"
                  )}
                </Button>
              </div>

              {/* Stock Status */}
              {product.inStock && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Ready to shop
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex gap-8 mb-8 border-b border-border">
            <button className="text-lg font-semibold text-foreground border-b-2 border-primary pb-2">
              Benefits
            </button>
            <button className="text-lg font-semibold text-muted-foreground hover:text-foreground pb-2">
              Best For
            </button>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Best For</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{product.category} enthusiasts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Perfect for {product.light} spaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {product.difficulty === "easy" ? "Beginner-friendly" : "Intermediate plant lovers"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
