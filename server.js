
/* import express from 'express';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url'; */

/* import productsRoutes from './server/src/routes/productsRoutes.js';  */

/* const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

console.log(path.join(path.join(__dirname, 'dist')));  */


/* app.use('/aquarium', express.static(path.join(__dirname, 'dist')));  */

/*  app.use( express.static(path.join(__dirname, 'dist'))); 

app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
}); 

 app.get('/aquarium', (req, res) => {
  console.log('Serving index.html');
  res.send('<h1>Aquarium</h1>');
});   */

/* app.use('/api/products', productsRoutes);   */

/* let aquariumProcess = null; */

// Lazy start endpoint
/*  app.get("/start-aquarium", (req, res) => {
  if (aquariumProcess) {
    return res.json({ status: "already-running" });
  }

  aquariumProcess = spawn("bun", ["src/index.ts"], {
    cwd: path.join(process.cwd(), "Aquarium", "server"),
    stdio: "inherit",
    shell: true,
  });

  aquariumProcess.on("exit", () => {
    aquariumProcess = null;
  });

  res.json({ status: "started" });
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Aquarium running at http://localhost:${PORT}`);
}); */


/* import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import backend from "./server/dist/index.js"; // <-- compiled backend

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
}); 


app.use("/api", backend);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Aquarium running at http://localhost:${PORT}`);
});
 */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import backend from "./server/dist/index.js"; // compiled backend

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
