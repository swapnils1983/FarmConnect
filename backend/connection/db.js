const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
