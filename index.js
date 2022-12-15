const express = require("express");
const app = express();
const router = require("./src/routes/index");
const { logErrors, errorHandler } = require("./src/middlewares/errorHandler");
const config = require("./src/lib/config");
const db = require("./src/lib/db");

app.use(express.json());
router(app);

app.use(logErrors);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "DEV is not working correctly" });
});

app.listen(config.app.port, () => {
  console.log(`Escucha peticion HTTP en el puerto ${config.app.port}`);
  try {
    db.connect();
    console.log("DB is working just fine");
  } catch (err) {
    console.error("Connection fail", err);
  }
});
