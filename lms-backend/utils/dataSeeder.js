const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dataseeder = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encrypt_password = await bcrypt.hash("password", salt);

    connectDB();

    // const opsfwc_users = [];
    // [...Array(10)].forEach((e, i) => {
    //   const n = ++i;
    //   opsfwc_users.push({
    //     firstname: `firstname${n}`,
    //     lastname: `lastname${n}`,
    //     username: `username${n}`,
    //     password: encrypt_password,
    //     team: mongoose.Types.ObjectId("611a6f48cac05ff518adc42b"),
    //     role: mongoose.Types.ObjectId("611a6f9bcac05ff518adc42d"),
    //     isAdmin: false,
    //   });
    // });
    // await User.insertMany(opsfwc_users);

    // const zelle1_users = [];
    // for (let i = 11; i <= 18; i++) {
    //   zelle1_users.push({
    //     firstname: `firstname${i}`,
    //     lastname: `lastname${i}`,
    //     username: `username${i}`,
    //     password: encrypt_password,
    //     team: mongoose.Types.ObjectId("611fa0403aaf1bc280dfc4a9"),
    //     role: mongoose.Types.ObjectId("611a6f9bcac05ff518adc42d"),
    //     isAdmin: false,
    //   });
    // }
    // await User.insertMany(zelle1_users);

    // const zelle2_users = [];
    // for (let i = 19; i <= 30; i++) {
    //   zelle2_users.push({
    //     firstname: `firstname${i}`,
    //     lastname: `lastname${i}`,
    //     username: `username${i}`,
    //     password: encrypt_password,
    //     team: mongoose.Types.ObjectId("6127b5948c557b3a307bfeba"),
    //     role: mongoose.Types.ObjectId("611a6f9bcac05ff518adc42d"),
    //     isAdmin: false,
    //   });
    // }
    // await User.insertMany(zelle2_users);

    const zelle4_users = [];
    for (let i = 31; i <= 35; i++) {
      zelle4_users.push({
        firstname: `firstname${i}`,
        lastname: `lastname${i}`,
        username: `username${i}`,
        password: encrypt_password,
        team: mongoose.Types.ObjectId("612c1565cf808c817c48280b"),
        role: mongoose.Types.ObjectId("611a6f9bcac05ff518adc42d"),
        isAdmin: false,
      });
    }
    await User.insertMany(zelle4_users);

    console.log("Data Inserted");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const connectDB = async () => {
  try {
    console.log("Connecting to DB");
    const conn = await mongoose.connect(
      "mongodb+srv://admin:passwordadmin@lms-cluster.gvibb.mongodb.net/lmsdb?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

dataseeder();

module.exports = { dataseeder };
