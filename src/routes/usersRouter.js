const { Router } = require("express");
const { getAll, create, authenticate, getById } = require("../usecases/user");
const { authHandler } = require("../middlewares/authHandler");

const routes = Router();

routes.get("/", authHandler, async (req, res) => {
  const id = req.params.token.sub;

  const { userName, passwordHashed, email } = await getUserById(id);

  res.json({ ok: true, payload: { userName, passwordHashed, email } 
});
});

routes.post("/", async (req, res) => {
  const { userName, passwordHashed, email, } = req.body;

  try {
    const payload = await create({ userName, passwordHashed, email,});
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const payload = await authenticate(email, password);
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.put("/", async (req, res) => {
    

    try {
        
    } catch (error) {
        
    }
//   res.status(405).json({ message: "Method not allowed" });
});

routes.put("/:id", (req, res) => {
  // Lógica para editar el usuario con el id X

  res.json({ message: `Usuario con el id ${req.params.id} modificado` });
});

routes.delete("/:id", (req, res) => {
  // Logica para eliminar el usuario con el id X

  res.json({ message: `Usuario con el id ${req.params.id} eliminado` });
});

module.exports = routes;
