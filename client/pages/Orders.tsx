import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  deliveryDate: string;
  deliveryAddress: {
    city: string;
    state: string;
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll use mock orders from localStorage
    // In production, this would fetch from the API
    const mockOrders: Order[] = [
      {
        _id: "17618885",
        items: [
          { productId: "1", name: "Money Plant", quantity: 1, price: 299 },
          { productId: "2", name: "Snake Plant", quantity: 1, price: 399 },
          { productId: "3", name: "Areca Palm", quantity: 1, price: 799 },
        ],
        total: 1716,
        status: "pending",
        createdAt: "2025-10-31",
        deliveryDate: "2025-11-07",
        deliveryAddress: { city: "bangalore", state: "karnataka" },
      },
      {
        _id: "17618861",
        items: [
          { productId: "4", name: "Jade Plant", quantity: 1, price: 249 },
          { productId: "5", name: "Peace Lily", quantity: 1, price: 449 },
        ],
        total: 957,
        status: "pending",
        createdAt: "2025-10-31",
        deliveryDate: "2025-11-07",
        deliveryAddress: { city: "bangalore", state: "karnataka" },
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
        <p className="text-muted-foreground mb-8">Pending Orders ({orders.length})</p>

        {orders.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-xl">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to place your first order!</p>
            <Link to="/shop" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Product Images */}
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="w-12 h-12 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-semibold"
                          >
                            🌿
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-semibold">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Order Details */}
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order._id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} items • Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="ml-auto">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Expected Delivery & Location */}
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground flex items-center gap-2">
                          📅 Expected Delivery
                        </p>
                        <p className="font-semibold">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-2">
                          📍 Delivery to
                        </p>
                        <p className="font-semibold capitalize">
                          {order.deliveryAddress.city}, {order.deliveryAddress.state}
                        </p>
                      </div>
                    </div>

                    {/* Order Amount */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-lg font-bold text-primary">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block">
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
