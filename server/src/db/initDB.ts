// src/db/initDB.ts
import { connectDB } from "./database";

const productsData = [
  
  [1, 'fishes', 'Neon Tetra', '1-3 years', '/aquarium/server/Fishes_Plants/Neon.webp', 'Peaceful community tank with plants', 'Flake food, small pellets, brine shrimp', null, '20-26°C (68-79°F)', null, 10, 0, 0.65],
  [2, 'fishes', 'Betta Fish', '2-4 years', '/aquarium/server/Fishes_Plants/RedBetta.jpeg', 'Single or with non-aggressive tank mates, well-planted tank', 'Pellets, frozen or live food', null, '24-30°C (75-86°F)', null, 10, 0, 1.50],
  [3, 'fishes', 'Guppy', '1-2 years', '/aquarium/server/Fishes_Plants/Guppy.jpeg', 'Community tank with other peaceful fish', 'Flake food, brine shrimp, daphnia', null, '22-28°C (72-82°F)', null, 10, 0, 0.75],
  [4, 'fishes', 'Angelfish', '8-10 years', '/aquarium/server/Fishes_Plants/PlateFish.jpeg', 'Tall aquarium with calm tank mates', 'Flakes, pellets, live or frozen food', null, '24-30°C (75-86°F)', null, 10, 0, 1.00],
  [5, 'fishes', 'Corydoras Catfish', '5 years', '/aquarium/server/Fishes_Plants/Goldfish.jpeg', 'Bottom of community tanks, soft substrate', 'Sinking pellets, worms, and flakes', null, '22-26°C (72-79°F)', null, 10, 0, 2.50],
  [6, 'fishes', 'Neon Tetra', '1-3 years', '/aquarium/server/Fishes_Plants/Neon.webp', 'Peaceful community tank with plants', 'Flake food, small pellets, brine shrimp', null, '20-26°C (68-79°F)', null, 10, 0, 0.65],
  [7, 'fishes', 'Betta Fish', '2-4 years', '/aquarium/server/Fishes_Plants/RedBetta.jpeg', 'Single or with non-aggressive tank mates, well-planted tank', 'Pellets, frozen or live food', null, '24-30°C (75-86°F)', null, 10, 0, 1.50],
  [8, 'fishes', 'Guppy', '1-2 years', '/aquarium/server/Fishes_Plants/Guppy.jpeg', 'Community tank with other peaceful fish', 'Flake food, brine shrimp, daphnia', null, '22-28°C (72-82°F)', null, 10, 0, 0.75],
  [9, 'fishes', 'Angelfish', '8-10 years', '/aquarium/server/Fishes_Plants/PlateFish.jpeg', 'Tall aquarium with calm tank mates', 'Flakes, pellets, live or frozen food', null, '24-30°C (75-86°F)', null, 10, 0, 1.00],
  [10, 'fishes', 'Corydoras Catfish', '5 years', '/aquarium/server/Fishes_Plants/Goldfish.jpeg', 'Bottom of community tanks, soft substrate', 'Sinking pellets, worms, and flakes', null, '22-26°C (72-79°F)', null, 10, 0, 2.50],
  [11, 'plants', 'Java Fern', null, '/aquarium/server/Fishes_Plants/plant1.jpeg', null, null, 'Low, attach to driftwood or rocks', '20-28°C (68-82°F)', 'Low to moderate', 10, 0, 1.23],
  [12, 'plants', 'Amazon Sword', null, '/aquarium/server/Fishes_Plants/plant2.jpg', null, null, 'Medium, root tabs needed', '22-28°C (72-82°F)', 'Moderate to high', 10, 0, 1.12],
  [13, 'plants', 'Anubias', null, '/aquarium/server/Fishes_Plants/plant3.jpeg', null, null, 'Low, attach to decorations', '22-28°C (72-82°F)', 'Low', 10, 0, 1.30],
  [14, 'plants', 'Hornwort', null, '/aquarium/server/Fishes_Plants/plant4.jpeg', null, null, 'Low, fast-growing, floating or planted', '15-30°C (59-86°F)', 'Moderate', 10, 0, 1.50],
  [15, 'plants', 'Water Wisteria', null, '/aquarium/server/Fishes_Plants/plant5.jpeg', null, null, 'Medium, occasional trimming', '23-28°C (73-82°F)', 'Moderate to high', 10, 0, 1.75],
  [16, 'plants', 'Java Fern', null, '/aquarium/server/Fishes_Plants/plant1.jpeg', null, null, 'Low, attach to driftwood or rocks', '20-28°C (68-82°F)', 'Low to moderate', 10, 0, 1.23],
  [17, 'plants', 'Amazon Sword', null, '/aquarium/server/Fishes_Plants/plant2.jpg', null, null, 'Medium, root tabs needed', '22-28°C (72-82°F)', 'Moderate to high', 10, 0, 1.12],
  [18, 'plants', 'Anubias', null, '/aquarium/server/Fishes_Plants/plant3.jpeg', null, null, 'Low, attach to decorations', '22-28°C (72-82°F)', 'Low', 10, 0, 1.30],
  [19, 'plants', 'Hornwort', null, '/aquarium/server/Fishes_Plants/plant4.jpeg', null, null, 'Low, fast-growing, floating or planted', '15-30°C (59-86°F)', 'Moderate', 10, 0, 1.50],
  [20, 'plants', 'Water Wisteria', null, '/aquarium/server/Fishes_Plants/plant5.jpeg', null, null, 'Medium, occasional trimming', '23-28°C (73-82°F)', 'Moderate to high', 10, 0, 1.75],
];

const initDB = async () => {
  const db = await connectDB();

  // 0. TEMPORARILY DISABLE FOREIGN KEY CHECKS (Using exec for system commands)
  // We keep PRAGMA on db.exec as they are driver control commands, not standard SQL DDL/DML.
  await db.exec(`PRAGMA foreign_keys = OFF;`);
  console.log("⚠️ Foreign key checks temporarily disabled.");


  // 1. CLEAN SLATE: Drop dependent tables first to avoid FOREIGN KEY errors
  // Using db.sql() for DDL commands as requested.
/*   await db.sql(`DROP TABLE IF EXISTS comments;`); */
 /*  await db.sql(`DROP TABLE IF EXISTS purchases;`); */
  /* await db.sql(`DROP TABLE IF EXISTS users;`); */
/*   await db.sql(`DROP TABLE IF EXISTS products;`);
  console.log("🧨 Old tables dropped if they existed.");  */ 

  // 2. CREATE TABLES: Create independent tables first
  // Using db.sql() for DDL commands as requested.

  // Create products table
  await db.sql(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      age TEXT,
      image TEXT,
      environment TEXT,
      food TEXT,
      maintenance TEXT,
      temperature TEXT,
      light TEXT,
      quantity INTEGER DEFAULT 0,
      liked INTEGER DEFAULT 0,
      price REAL
    );
  `);
  console.log("✅ Products table created");

  // Create users table
  await db.sql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isAdmin INTEGER DEFAULT 0
    );
  `);
  console.log("✅ Users table created");


  // 3. CREATE DEPENDENT TABLES: Now we can safely create purchases and comments
  // Using db.sql() for DDL commands as requested.

  await db.sql(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      purchaseDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(productId) REFERENCES products(id)
    );
  `);
  console.log("✅ Purchases table created");
  
  await db.sql(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      userId INTEGER,
      username TEXT, 
      role TEXT,   
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      
    );
  `);
  /* FOREIGN KEY(userId) REFERENCES users(id) */
  console.log("✅ Comments table created");

  // 4. INSERT DATA: Insert initial product data
  const insertSql = `
    INSERT OR IGNORE INTO products (id, category, name, age, image, environment, food, maintenance, temperature, light, quantity, liked, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
 
  for (const product of productsData) {
    await db.sql(insertSql, ...product);
  }
 
  console.log("✅ Initial Products inserted (or ignored if they exist)");

  // 5. RE-ENABLE FOREIGN KEY CHECKS (Using exec for system commands)
/*   await db.exec(`PRAGMA foreign_keys = ON;`);
  console.log("✅ Foreign key checks re-enabled."); */

};

initDB().catch((err) => {
  console.error("❌ Failed to initialize DB:", err);
});