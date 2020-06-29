const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

async function connectDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('Connected to Database...')
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;