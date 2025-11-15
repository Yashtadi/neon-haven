import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface PaymentData {
  method: "upi" | "cod";
  couponCode: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "cod",
    couponCode: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(subtotal * 0.2);
  const shipping = 0;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all fields");
      return false;
    }
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cart,
        subtotal,
        discount,
        shipping,
        total,
        deliveryAddress: formData,
        paymentMethod: paymentData.method === "upi" ? "UPI Payment" : "Cash on Delivery",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": localStorage.getItem("authUser") 
            ? JSON.parse(localStorage.getItem("authUser") || "{}").email 
            : "user",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const order = await response.json();
      localStorage.removeItem("cart");

      // Redirect to order detail
      navigate(`/orders/${order._id}`);
    } catch (error) {
      alert("Failed to place order: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Address" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Review" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/cart" className="flex items-center gap-2 text-primary hover:gap-3 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step >= s.number ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {s.number}
              </div>
              <p className={`ml-2 font-medium ${step >= s.number ? "text-primary" : "text-muted-foreground"}`}>
                {s.title}
              </p>
              {idx < steps.length - 1 && (
                <div className={`mx-4 h-1 w-16 ${step > s.number ? "bg-primary" : "bg-muted"}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">🏠 Delivery Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Plant Lover"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder="House No., Building name, Street"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        placeholder="City"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                        placeholder="State"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleFormChange}
                      placeholder="6-digit pincode"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 mt-6 gap-2"
                >
                  Continue to Payment
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">💳 Payment Method</h2>

                <div className="space-y-3 mb-6">
                  <label className="border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentData.method === "upi"}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, method: e.target.value as "upi" }))}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 flex-1">
                      <strong>UPI Payment</strong>
                      <p className="text-sm text-muted-foreground">Pay using UPI ID</p>
                    </span>
                  </label>

                  <label className="border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentData.method === "cod"}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, method: e.target.value as "cod" }))}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 flex-1">
                      <strong>Cash on Delivery</strong>
                      <p className="text-sm text-muted-foreground">Pay when you receive</p>
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Make a Coupon Code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={paymentData.couponCode}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, couponCode: e.target.value }))}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-white">Apply</Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-border font-bold py-3"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 gap-2"
                  >
                    Continue to Review
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">✅ Review Order</h2>

                <div className="space-y-6">
                  {/* Delivery Address */}
                  <div className="border-b border-border pb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      🏠 <span>Delivery Address</span> <span className="text-sm text-muted-foreground ml-auto">Edit</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.fullName}
                      <br />
                      {formData.phone}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} - {formData.pincode}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="border-b border-border pb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      💳 <span>Payment Method</span> <span className="text-sm text-muted-foreground ml-auto">Edit</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentData.method === "upi" ? "UPI Payment" : "Cash on Delivery"}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="border-b border-border pb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      📦 <span>Order Items (5)</span>
                    </h3>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item._id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Delivery */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      📅 Expected Delivery
                    </h3>
                    <p className="text-sm text-muted-foreground">By 7 November 2025</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 border-border font-bold py-3"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3"
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="border border-border rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Bill Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span className="text-muted-foreground">💚 Subscription (20%)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                💛 Pro benefits included! 5 free pot(s)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
