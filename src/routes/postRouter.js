const { Router } = require ("express");
const { create, getUserPosts, getPostById, updatePost, deletePost } = require ("../usecases/post/index");

const routes = Router ();

  routes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { title, text, tags, image, user, comments, date } = await getPostById(id);
      res.json({
        ok: true,
        payload: { title, text, tags, image, user, comments, date },
      });
    } catch (error) {
      res.status(400).json({ ok: false, message: error });
    }
  });


  routes.post("/", async (req, res) => {
    const { title, text, tags, image, user, comments, date  } = req.body;
    try {
      const payload = await create(title, text, tags, image, user, comments, date);
      res.json({
        ok: true,
        message: "Post created successfully",
        payload,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        message: error,
      });
    }
  });

  
  routes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, text, tags, image } = req.body;
    try {
      const data = { id, title, text, tags, image };
      const post = await updatePost (id, data);
      res.json({ ok: true, payload: post });
    } catch (error) {
      const { message } = error;
      res.status(400).json({ ok: false, message });
    }
  });


  routes.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {title } = await deletePost (id);
      res.json({ ok: true, payload: { id, title } });
    } catch (error) {
      const { message } = error;
      res.status(400).json({ ok: false, message });
    }
  });
  
  
  
  module.exports = routes;
  
  