const usersRouter = require("./usersRouter");
const postRouter = require ("/postRouter");

const router = (app) =>{
    app.use  ("/users", usersRouter);
    app.use ("post", postRouter);
};

module.express = router;