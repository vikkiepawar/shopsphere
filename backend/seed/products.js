const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ override: true });

const Product = require("../models/Product");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env");
  process.exit(1);
}

const products = [
  // ELECTRONICS
  {
    name: "Samsung Galaxy S24",
    price: 54999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    category: "Electronics",
    description: "Premium Android smartphone with powerful performance and excellent camera.",
    stock: 25,
  },
  {
    name: "OnePlus 12",
    price: 64999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    category: "Electronics",
    description: "Flagship smartphone with fast performance and a high refresh rate display.",
    stock: 18,
  },
  {
    name: "Apple iPhone 15",
    price: 69999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    category: "Electronics",
    description: "Powerful Apple smartphone with advanced camera system and premium design.",
    stock: 20,
  },
  {
    name: "Google Pixel 9",
    price: 79999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "Electronics",
    description: "Google smartphone with excellent computational photography and clean Android.",
    stock: 15,
  },
  {
    name: "Samsung Galaxy Tab S9",
    price: 58999,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
    category: "Electronics",
    description: "Premium Android tablet suitable for entertainment, study and productivity.",
    stock: 12,
  },

  // LAPTOPS
  {
    name: "Apple MacBook Air M3",
    price: 99999,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    category: "Laptops",
    description: "Lightweight laptop powered by Apple Silicon with excellent battery life.",
    stock: 10,
  },
  {
    name: "Dell Inspiron 15",
    price: 58999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "Laptops",
    description: "Reliable everyday laptop for students, professionals and home users.",
    stock: 16,
  },
  {
    name: "HP Pavilion 14",
    price: 62999,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    category: "Laptops",
    description: "Compact performance laptop with a modern design.",
    stock: 14,
  },
  {
    name: "Lenovo IdeaPad Slim 5",
    price: 54999,
    image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
    category: "Laptops",
    description: "Slim and portable laptop designed for productivity and study.",
    stock: 20,
  },
  {
    name: "ASUS Vivobook 16",
    price: 67999,
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593",
    category: "Laptops",
    description: "Large-display laptop combining performance, portability and productivity.",
    stock: 11,
  },

  // AUDIO
  {
    name: "Sony WH-1000XM5",
    price: 29999,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation.",
    stock: 30,
  },
  {
    name: "AirPods Pro 2",
    price: 24999,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    category: "Audio",
    description: "Wireless earbuds with active noise cancellation and spatial audio.",
    stock: 35,
  },
  {
    name: "JBL Flip 6",
    price: 8999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Audio",
    description: "Portable Bluetooth speaker with powerful sound and waterproof design.",
    stock: 40,
  },
  {
    name: "boAt Rockerz 450",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Audio",
    description: "Affordable wireless headphones with comfortable fit and long battery life.",
    stock: 50,
  },
  {
    name: "Marshall Emberton II",
    price: 16999,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689",
    category: "Audio",
    description: "Premium portable speaker with iconic Marshall styling.",
    stock: 17,
  },

  // ACCESSORIES
  {
    name: "Logitech MX Master 3S",
    price: 8999,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    category: "Accessories",
    description: "Advanced wireless mouse designed for productivity and precision.",
    stock: 25,
  },
  {
    name: "Logitech K380 Keyboard",
    price: 2999,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    category: "Accessories",
    description: "Compact wireless keyboard suitable for multiple devices.",
    stock: 32,
  },
  {
    name: "USB-C Hub 7-in-1",
    price: 1999,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
    category: "Accessories",
    description: "Multi-port USB-C hub for laptops and tablets.",
    stock: 45,
  },
  {
    name: "Laptop Stand",
    price: 1299,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    category: "Accessories",
    description: "Adjustable aluminum laptop stand for comfortable working.",
    stock: 50,
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 3999,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a",
    category: "Accessories",
    description: "Mechanical keyboard with responsive switches for gaming and productivity.",
    stock: 28,
  },

  // GAMING
  {
    name: "Sony PlayStation 5",
    price: 49999,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    category: "Gaming",
    description: "Next-generation gaming console with immersive graphics and fast loading.",
    stock: 8,
  },
  {
    name: "Xbox Series X",
    price: 49999,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
    category: "Gaming",
    description: "High-performance gaming console built for 4K gaming.",
    stock: 7,
  },
  {
    name: "Gaming Controller",
    price: 4999,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
    category: "Gaming",
    description: "Wireless controller with ergonomic design and precise controls.",
    stock: 24,
  },
  {
    name: "Gaming Headset",
    price: 3499,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440",
    category: "Gaming",
    description: "Gaming headset with immersive audio and built-in microphone.",
    stock: 35,
  },
  {
    name: "Gaming Mouse",
    price: 2499,
    image: "https://images.unsplash.com/photo-1563297007-0686b7003af7",
    category: "Gaming",
    description: "High-precision gaming mouse with programmable buttons.",
    stock: 40,
  },

  // FASHION
  {
    name: "Classic Cotton T-Shirt",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Fashion",
    description: "Comfortable everyday cotton T-shirt with a classic fit.",
    stock: 60,
  },
  {
    name: "Denim Jacket",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    category: "Fashion",
    description: "Classic denim jacket suitable for casual outfits.",
    stock: 25,
  },
  {
    name: "Hoodie",
    price: 1599,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    category: "Fashion",
    description: "Warm and comfortable hoodie for everyday wear.",
    stock: 40,
  },
  {
    name: "Slim Fit Jeans",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    category: "Fashion",
    description: "Modern slim-fit denim jeans with comfortable stretch fabric.",
    stock: 45,
  },
  {
    name: "Casual Shirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    category: "Fashion",
    description: "Stylish casual shirt suitable for everyday occasions.",
    stock: 35,
  },

  // SHOES
  {
    name: "Nike Air Max",
    price: 7999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Shoes",
    description: "Comfortable sports shoes with responsive cushioning.",
    stock: 20,
  },
  {
    name: "Adidas Ultraboost",
    price: 10999,
    image: "https://images.unsplash.com/photo-1556637640-2c80d3201be8",
    category: "Shoes",
    description: "Premium running shoes designed for comfort and performance.",
    stock: 18,
  },
  {
    name: "Running Shoes",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
    category: "Shoes",
    description: "Lightweight running shoes for daily workouts.",
    stock: 50,
  },
  {
    name: "Casual Sneakers",
    price: 2199,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
    category: "Shoes",
    description: "Versatile sneakers for casual everyday styling.",
    stock: 42,
  },
  {
    name: "Sports Training Shoes",
    price: 2999,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Shoes",
    description: "Training shoes designed for gym and sports activities.",
    stock: 30,
  },

  // WATCHES
  {
    name: "Apple Watch Series 10",
    price: 46999,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26",
    category: "Watches",
    description: "Smartwatch with health tracking, notifications and fitness features.",
    stock: 12,
  },
  {
    name: "Samsung Galaxy Watch",
    price: 29999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Watches",
    description: "Smartwatch with fitness tracking and smartphone integration.",
    stock: 15,
  },
  {
    name: "Classic Analog Watch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    category: "Watches",
    description: "Elegant analog watch with a timeless design.",
    stock: 30,
  },
  {
    name: "Casio Digital Watch",
    price: 1999,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    category: "Watches",
    description: "Durable digital watch suitable for everyday use.",
    stock: 35,
  },
  {
    name: "Fossil Chronograph",
    price: 11999,
    image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
    category: "Watches",
    description: "Premium chronograph watch with a sophisticated design.",
    stock: 14,
  },

  // HOME
  {
    name: "Coffee Maker",
    price: 3499,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    category: "Home",
    description: "Compact coffee maker for preparing fresh coffee at home.",
    stock: 25,
  },
  {
    name: "Air Fryer",
    price: 5999,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62",
    category: "Home",
    description: "Modern air fryer for healthier cooking with less oil.",
    stock: 18,
  },
  {
    name: "Electric Kettle",
    price: 1499,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
    category: "Home",
    description: "Fast-boiling electric kettle with automatic shutoff.",
    stock: 40,
  },
  {
    name: "Table Lamp",
    price: 999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "Home",
    description: "Minimal modern table lamp for bedrooms and workspaces.",
    stock: 35,
  },
  {
    name: "Smart LED Bulb",
    price: 799,
    image: "https://images.unsplash.com/photo-1550985543-f47d72c4d6b1",
    category: "Home",
    description: "Smart LED bulb with adjustable brightness and colors.",
    stock: 55,
  },

  // FITNESS
  {
    name: "Yoga Mat",
    price: 899,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    category: "Fitness",
    description: "Non-slip exercise mat suitable for yoga and home workouts.",
    stock: 50,
  },
  {
    name: "Adjustable Dumbbells",
    price: 4999,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    category: "Fitness",
    description: "Adjustable dumbbells for strength training at home.",
    stock: 20,
  },
  {
    name: "Resistance Bands",
    price: 699,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc",
    category: "Fitness",
    description: "Set of resistance bands for full-body workouts.",
    stock: 60,
  },
  {
    name: "Gym Gloves",
    price: 599,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    category: "Fitness",
    description: "Comfortable training gloves with wrist support.",
    stock: 45,
  },
  {
    name: "Skipping Rope",
    price: 399,
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712",
    category: "Fitness",
    description: "Lightweight skipping rope for cardio and conditioning.",
    stock: 70,
  },
];

const seedProducts = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    console.log("✅ MongoDB connected");

    await Product.deleteMany({});
    console.log("🗑️ Existing products removed");

    await Product.insertMany(products);

    console.log(
      `✅ ${products.length} products inserted successfully`
    );

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedProducts();
