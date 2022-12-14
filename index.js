const express = require ("express");
const app = express ();
const router = require ("./src/routes/index");
const {} = require ("./src/middlewares/errorHandler");
const config = require ("./src/lib/config");
const db = require ("./src/lib/db")

app.use (express.json());
router(app);

app.get ("/", (req, res) =>{
    res.json ({ message: "DEV is not working correctly"})
});


app.listen (config.app.port, async ()=>{
    console.log (`Escucha peticion HTTP en el puerto ${config.app.port}`);
    try {
        await db.connect();
        console.log ("DB is working durisimo")
    } catch (err) {
        console.error("Connection fail, as you fail in love", err);
    }
});

