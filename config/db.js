const mongoose = require("mongoose");
const config = require("config");

const DB = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewURLParser: true,
    });
    console.log("mongoDB Connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// const connectDB = () =>
//   mongoose
//     .connect(DB, {
//       useNewURLParser: true,
//     })
//     .then(() => console.log("mongoDB Connected"))
//     .catch((err) => {
//       console.error(err.message);
//       process.exit(1);
//     });

module.exports = connectDB;
