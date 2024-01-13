const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI +"/" + process.env.DB_NAME
    );
    console.log('DB Connected');
  } catch (error) {
    console.log("error connect db");
  }
};

module.exports = connectDb;
