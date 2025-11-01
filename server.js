
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import backend from "./server/dist/index.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/aquarium', express.static(path.join(__dirname, "dist")));


app.use("/api", backend);


// ✅ Serve images from backend
app.use('/aquarium/server/Fishes_Plants', express.static(path.join(__dirname, 'server', 'Fishes_Plants')));


app.get('/aquarium', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); 
});

app.listen(PORT, () => {
  console.log(`✅ Aquarium running at http://localhost:${PORT}/aquarium`);
});
