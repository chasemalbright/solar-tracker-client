require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('db connection successful')
    } catch (error) {
        console.log("error: connection failed")
        process.exit(1);
    }
};

module.exports = connectDB;