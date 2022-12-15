const { Router } = require("express");
const {   
  create,
  getUserById,
  getAllUsers,
  updateUser,
  findByEmail,
  authenticate,
  delUser,
} = require("../usecases/users");
const user = require("../usecases/users");
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
    const payload = await user.create({ userName, passwordHashed, email,});
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

routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {userName, password, email} = req.body;
  try {
    const data = { userName, password, email };
    const user = await updateUser (id, data);
    res.json({ ok: true, payload: user });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userName } = await delUser (id,userName);
    res.json({ ok: true, payload: { id, userName } });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
