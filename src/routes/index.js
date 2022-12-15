const usersRouter = require("./usersRouter.js");
const postRouter = require ("./postRouter");

const router = (app) =>{
    app.use  ("/users", usersRouter);
    app.use ("/post", postRouter);
};

module.exports = router;