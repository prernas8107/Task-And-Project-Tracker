const mongoose = require('mongoose');
const dns = require('dns');

// Forces Atlas SRV resolution on any network/system
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.error('Database Connection Error: ' + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
