const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/devicemanagement');
    console.log('Đã kết nối đến MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
  }
};

module.exports = connectToMongoDB;
