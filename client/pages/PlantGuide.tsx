import React from "react";

export default function PlantGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Plant Information Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn which plants are perfect for different spaces in Indian homes
            and their amazing benefits
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon! 🌿</h2>
            <p className="text-muted-foreground mb-6">
              We're building out a comprehensive plant guide with information
              about:
            </p>
            <ul className="text-left inline-block space-y-2 text-muted-foreground mb-6">
              <li>
                ✅ Best plants for different rooms (Home, Office, Bedroom,
                Balcony)
              </li>
              <li>✅ Plant care requirements and compatibility</li>
              <li>✅ Benefits of different plants</li>
              <li>✅ Vastu & Cultural significance</li>
              <li>✅ Plant pairing suggestions</li>
            </ul>
            <p className="text-primary font-semibold">
              Check back soon for detailed guides!
            </p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">
              🏠 Best Plants for Homes
            </h3>
            <p className="text-muted-foreground text-sm">
              Discover the perfect plants for your living room, bedroom,
              kitchen, and balcony that thrive in Indian homes.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">
              👑 Plant Significance
            </h3>
            <p className="text-muted-foreground text-sm">
              Learn about Vastu Shastra plant recommendations and cultural
              benefits of different plants in Indian culture.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">💚 Health Benefits</h3>
            <p className="text-muted-foreground text-sm">
              Explore the health and wellness benefits of indoor plants
              including air purification and mental health.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🤝 Pairing Guide</h3>
            <p className="text-muted-foreground text-sm">
              Find out which plants complement each other and create beautiful
              plant combinations for your space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
