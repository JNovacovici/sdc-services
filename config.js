const mongoose = require('mongoose');

const connectMongoDb = async () => {
  try {
    // 'mongodb://ec2-35-171-18-33.compute-1.amazonaws.com'
    console.log('Waiting for connection');
    const connect = await mongoose.connect(('mongodb://ec2-35-171-18-33.compute-1.amazonaws.com:27017/SDC_QnA'));
    console.log('MongoDB connection:', connect.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
  }
}

module.exports = connectMongoDb;