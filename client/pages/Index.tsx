import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  scientificName: string;
  price: number;
  image: string;
  category: string;
}

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setFeaturedProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: "Indoor Plants", icon: "🌱", count: 10 },
    { name: "Outdoor Plants", icon: "🌿", count: 5 },
    { name: "Gifting", icon: "🎁", count: 3 },
    { name: "XL Plants", icon: "🌳", count: 2 },
  ];

  const subscriptionPlans = [
    {
      name: "Eco Plan",
      price: "₹299",
      description: "/month",
      benefits: [
        "10% discount on all plants",
        "Free delivery on orders above ₹1000",
        "Monthly plant care newsletter",
        "Priority customer support",
      ],
      buttonText: "Subscribe to Eco",
      buttonColor: "bg-primary",
    },
    {
      name: "Pro Plan",
      price: "₹599",
      description: "/month",
      badge: "Most Popular",
      badgeColor: "bg-yellow-500",
      benefits: [
        "20% discount on all plants",
        "Free delivery on all orders",
        "Free decorative pot with every plant",
        "Quarterly plant health check-up guide",
        "Early access to new arrivals",
        "Expert consultation via chat",
      ],
      buttonText: "Current Plan",
      buttonColor: "bg-yellow-500",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Bring Nature Home
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our curated collection of beautiful, healthy plants delivered straight to your door. Join our membership for exclusive perks!
              </p>
              <div className="flex gap-4">
                <Link to="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                    Shop Plants
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1545241045-2df4ba917b71?w=600&h=400&fit=crop"
                alt="Plant collection"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Get your plants delivered to your doorstep with care
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="text-lg font-semibold mb-2">Healthy Plants</h3>
              <p className="text-muted-foreground text-sm">
                All plants are carefully selected and nurtured
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="text-lg font-semibold mb-2">Subscription Perks</h3>
              <p className="text-muted-foreground text-sm">
                Up to 20% off with our Eco & Pro subscription plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-12 bg-gradient-to-r from-primary via-primary/90 to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-4xl mb-4">👑</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join PlantHub Subscription</h2>
          <p className="text-lg text-white/90 mb-6">
            Get up to 20% discount, free delivery, free pots, and expert plant care consultation!
          </p>
          <Link to="/shop">
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
              View Plans
            </Button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Plants</h2>
            <Link to="/shop" className="flex items-center gap-2 text-primary hover:gap-3 transition font-semibold">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="bg-muted h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-8 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition group">
                    <div className="relative overflow-hidden bg-muted h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{product.scientificName}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to go green?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start your plant journey today and transform your space into a green oasis.
          </p>
          <Link to="/shop">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
