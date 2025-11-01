/* import express from "express";
import productsRoutes from "./routes/productsRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import purchaseRoutes from "./routes/purchaseRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
 */
/* app.use("/images", express.static(path.join(__dirname, "../public/images"))); */


/* app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
}); 
 */


import express from "express";
import productsRoutes from "./routes/productsRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import purchaseRoutes from "./routes/purchaseRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Configure middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

// ✅ Define routes
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/comments", commentsRoutes);



  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });


// ✅ Export for main server.js
export default app;
