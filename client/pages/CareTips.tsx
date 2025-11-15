import React, { useState } from "react";

export default function CareTips() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      icon: "💧",
      title: "Watering: The Golden Rule",
      description:
        "In Indian climate, especially during monsoons and summers, watering needs change. Most plants prefer to dry out slightly between waterings.",
      details: [
        "Stick your finger 2 inches into the soil. If it feels dry, it's time to water. If it still moist, wait.",
        "Low Water: Water every 2 weeks (Succulents, Snake Plant, Aloe Vera)",
        "Medium Water: Water weekly in summer, less in monsoon (Money Plant, Rubber Plant, Areca Palm)",
        "High Water: Keep soil moist, especially in monsoon (Ferns, Spider Plant)",
      ],
      highlight: "Low Water",
      highlightColor: "bg-blue-100",
    },
    {
      number: 2,
      icon: "☀️",
      title: "Light: Find the Sweet Spot",
      description:
        "Indian homes have varying light conditions. Understanding your plant's light needs based on your balcony or window direction is crucial.",
      details: [
        "Bright Direct Light: South or west facing balconies/windows. Perfect for: Tulsi, Aloe Vera, Jade Plant. Best in morning sun to avoid harsh afternoon heat.",
        "Bright Indirect Light: North or east facing windows or a few feet from bright windows. Ideal for: Money Plant, Rubber Plant, Areca Palm.",
        "Low Light: North facing windows or interior rooms with AC. Perfect for: Snake Plant, ZZ Plant, Peace Lily.",
      ],
      highlight: "Bright Indirect Light",
      highlightColor: "bg-yellow-100",
    },
    {
      number: 3,
      icon: "🌡️",
      title: "Temperature & Humidity",
      description:
        "Indian climate varies from extreme summers to humid monsoons. Here's how to care for your plants through different seasons.",
      details: [
        "Most houseplants prefer 18–30°C. Tips for Indian homes:",
        "Move plants away from direct AC vents during summer",
        "Group plants together for humidity during dry weather",
        "Increase humidity in monsoon by using a pebble tray with water",
        "Use a humidifier in monsoon for humidity-loving plants",
        "Reduce watering in air conditioned rooms during monsoon",
      ],
      highlight: "Temperature Management",
      highlightColor: "bg-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            5-Step Plant Care Guide for Indian Climate
          </h1>
          <p className="text-lg text-muted-foreground">
            New to plants? Don't worry! Follow these 5 simple steps tailored for
            Indian homes to keep your plants healthy and thriving.
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden h-96 bg-muted flex items-center justify-center text-6xl">
          🌾
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                setActiveStep(activeStep === step.number ? 0 : step.number)
              }
            >
              {/* Header */}
              <div className={`${step.highlightColor} p-6 transition`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      <span className="text-primary">{step.number}.</span>{" "}
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {activeStep === step.number && (
                <div className="p-6 border-t border-border bg-white">
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="text-xl mt-1">•</div>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Why Plants Are Essential */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            ✨ Why Plants Are Essential for Indian Homes
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">🏥 Health Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Combat city pollution and purify indoor air</li>
                <li>✓ Increase humidity in AC environments</li>
                <li>✓ Reduce stress and improve mental health</li>
                <li>✓ Improve concentration and productivity</li>
                <li>✓ Natural cooling effect on hot weather</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">
                👑 Cultural & Spiritual
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Vastu Shastra compliance for positive energy</li>
                <li>✓ Sacred plants like Tulsi for worship</li>
                <li>✓ Feng Shui balance in living spaces</li>
                <li>✓ Traditional Ayurvedic medicinal plants</li>
                <li>✓ Create a healthier living environment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            💡 Quick Care Tips for Indian Climate
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">☔ During Monsoon</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Reduce watering frequency</li>
                <li>✓ Increase air circulation</li>
                <li>✓ Watch for fungal issues</li>
                <li>✓ Move plants away from water leaks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">🌞 During Summer</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Water more frequently</li>
                <li>✓ Provide afternoon shade</li>
                <li>✓ Increase humidity around plants</li>
                <li>✓ Avoid harsh direct sun</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">❄️ During Winter</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Reduce watering, soil dries slower</li>
                <li>✓ Maximize sunlight exposure</li>
                <li>✓ Protect from cold drafts</li>
                <li>✓ Minimize fertilizing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to bring nature into your home? Start with plants that match
            your care level!
          </p>
          <a
            href="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            Shop Plants Now
          </a>
        </div>
      </div>
    </div>
  );
}
