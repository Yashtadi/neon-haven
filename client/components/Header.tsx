import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Heart, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "[]").length : 0;

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/" : "/auth"} className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl text-primary font-bold">🌿</div>
            <span className="text-xl font-bold text-primary hidden sm:inline">PlantHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
            {isAuthenticated && (
              <>
                <Link to="/" className={`text-sm font-medium transition ${isActive("/")}`}>
                  Home
                </Link>
                <Link to="/shop" className={`text-sm font-medium transition ${isActive("/shop")}`}>
                  Shop
                </Link>
                <Link to="/plant-guide" className={`text-sm font-medium transition ${isActive("/plant-guide")}`}>
                  Plant Guide
                </Link>
                <Link to="/care-tips" className={`text-sm font-medium transition ${isActive("/care-tips")}`}>
                  Care Tips
                </Link>
              </>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Wishlist & Cart */}
            {isAuthenticated && (
              <>
                <button className="p-2 hover:bg-muted rounded-full transition" title="Wishlist">
                  <Heart className="w-5 h-5 text-yellow-500" />
                </button>
                <Link to="/cart" className="relative p-2 hover:bg-muted rounded-full transition" title="Shopping Cart">
                  <ShoppingCart className="w-5 h-5 text-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Your Orders & Login/Logout */}
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="hidden sm:flex items-center gap-1 px-3 py-1 text-sm font-medium text-foreground hover:text-primary transition">
                  📋 Your Orders
                </Link>
                <div className="relative group">
                  <button className="p-2 hover:bg-muted rounded-full transition">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <Button className="gap-2" size="sm">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-2">
              <Link to="/" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition">
                Home
              </Link>
              <Link to="/shop" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition">
                Shop
              </Link>
              <Link to="/orders" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition">
                📋 Your Orders
              </Link>
              <Link to="/plant-guide" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition">
                Plant Guide
              </Link>
              <Link to="/care-tips" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition">
                Care Tips
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive rounded-lg hover:bg-muted transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
