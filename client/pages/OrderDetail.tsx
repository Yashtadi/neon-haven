import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
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
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock order data for demo
    const mockOrder: Order = {
      _id: id || "17618885",
      items: [
        { productId: "1", name: "Aloe Vera", quantity: 1, price: 199 },
        { productId: "2", name: "Areca Palm", quantity: 1, price: 799 },
        { productId: "3", name: "Jade Plant (Crassula)", quantity: 1, price: 249 },
        { productId: "4", name: "Rubber Plant (Ficus)", quantity: 1, price: 599 },
        { productId: "5", name: "Money Plant", quantity: 1, price: 299 },
      ],
      subtotal: 2145,
      discount: 429,
      shipping: 0,
      total: 1716,
      status: "pending",
      createdAt: "2025-10-31",
      deliveryDate: "2025-11-07",
      deliveryAddress: {
        fullName: "Plant Lover",
        phone: "7616553540",
        address: "peS",
        city: "bangalore",
        state: "karnataka",
        pincode: "365007",
      },
      paymentMethod: "Cash on Delivery",
    };

    setOrder(mockOrder);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Order not found</p>
          <Link to="/orders" className="text-primary hover:underline mt-4 inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/orders" className="flex items-center gap-2 text-primary hover:gap-3 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order #{order._id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Status */}
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                📅 Delivery Status
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900 font-semibold">Order Confirmed</p>
                <p className="text-sm text-blue-800">Your order is being prepared</p>
                <p className="text-sm text-blue-700 mt-2">
                  Projected delivery by {new Date(order.deliveryDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📍 Delivery Address
              </h2>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold text-foreground">{order.deliveryAddress.fullName}</p>
                <p className="text-muted-foreground text-sm">{order.deliveryAddress.phone}</p>
                <p className="text-muted-foreground text-sm mt-2">{order.deliveryAddress.address}</p>
                <p className="text-muted-foreground text-sm">
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💳 Payment Method
              </h2>
              <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center text-lg">
                  💵
                </div>
                <div>
                  <p className="font-semibold">{order.paymentMethod}</p>
                  <p className="text-sm text-muted-foreground">Pay when you receive</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📦 Order Items ({order.items.length})
              </h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                      🌿
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Delivery */}
            <div className="border border-green-200 bg-green-50 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-900">
                🚚 Expected Delivery
              </h2>
              <p className="text-green-800">
                By <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="border border-border rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Bill Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span className="text-muted-foreground">💚 Subscription Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total Paid</span>
              <span className="text-primary">₹{order.total.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                💛 Pro benefits included! 5 free pot(s)
              </div>
            )}

            <button className="w-full mt-6 border border-border rounded-lg py-2 hover:bg-muted transition font-medium">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
