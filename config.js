const mongoose = require('mongoose');

const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(('mongodb://localhost/SDC_QnA'));
    console.log('MongoDB connection:', connect.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
  }
}

module.exports = connectMongoDb;