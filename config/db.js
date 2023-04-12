const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewURLParser: true,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    // Exit process if failed
    process.exit(1);
  }
};

module.exports = connectDB;

// "mongodb+srv://prasanna:h6yhJiw77FoYhAJG@devconnector.yyztknd.mongodb.net/?retryWrites=true&w=majority"

// MERN DEVHUB CLUSTER CONNECTION DETAILS
// Username: prasanna
// password:  h6yhJiw77FoYhAJG

// A default.json file in this config folder is required to run this app.
