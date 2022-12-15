const mongoose = require("mongoose");
const config = require("./config");

const connect = () => {
   new Promise(async (resolve, reject) => {
    const { user, password, host } = config.db;

    mongoose.connect(
      `mongodb+srv://${user}:${password}@${host}/ecommerce?retryWrites=true&w=majority`
    );

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connection succesful");
      resolve(mongoose);
    });

    db.on("error", (err) => {
      console.error("Connection failed", err);
      reject(err);
    });
  });
};

module.exports = { connect };