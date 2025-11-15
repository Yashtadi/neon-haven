import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  scientificName: string;
  price: number;
  image: string;
  category: string;
  light: string;
  water: string;
  inStock: boolean;
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Plants");

  const categories = ["All Plants", "Indoor Plants", "Outdoor Plants", "Gifting", "Office Plants", "XL Plants"];
  const sortOptions = ["Name", "Price: Low to High", "Price: High to Low"];
  const [selectedSort, setSelectedSort] = useState("Name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const category = selectedCategory === "All Plants" ? "" : selectedCategory;
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (searchTerm) params.append("search", searchTerm);

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();

        let sorted = [...data.products];
        if (selectedSort === "Price: Low to High") {
          sorted.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "Price: High to Low") {
          sorted.sort((a, b) => b.price - a.price);
        } else {
          sorted.sort((a, b) => a.name.localeCompare(b.name));
        }

        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchTerm, selectedSort]);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
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
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">All Plants</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold mb-3">Search plants...</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{cat}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {cat === selectedCategory ? `${products.length}` : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bestsellers */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">⭐ Bestsellers</h3>
              <p className="text-sm text-muted-foreground">5</p>
            </div>

            {/* Filters Info */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Showing:</strong> {products.length} plants
              </p>
            </div>
          </aside>

          {/* Products */}
          <div className="md:col-span-3">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} plants
                {searchTerm && ` for "${searchTerm}"`}
              </p>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="appearance-none px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition group">
                    <Link to={`/product/${product._id}`}>
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
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-semibold text-foreground truncate hover:text-primary">{product.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{product.scientificName}</p>
                      </Link>

                      <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded">{product.light}</span>
                        <span className="bg-muted px-2 py-1 rounded">{product.water}</span>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No plants found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
