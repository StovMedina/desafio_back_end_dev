const mongoose = require("mongoose");
const config = require("./config");

const connect = () => {
  return new Promise(async (resolve, reject) => {
    const { user, password, host } = config.db;

    // mongoose.connect(
    //   `mongodb+srv://${user}:${password}@${host}/ecommerce?retryWrites=true&w=majority`
    // );

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connection exitosa, como tu codigo");
      resolve(mongoose);
    });

    db.on("error", (err) => {
      console.error("Connection failed, como tu en la vida", err);
      reject(err);
    });
  });
};

module.exports = { connect };