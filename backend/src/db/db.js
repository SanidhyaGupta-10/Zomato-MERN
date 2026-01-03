const mongoose = require('mongoose');

function ConnectDB() {
    if (!process.env.MONGO_URI) {
        console.warn("MongoDB connection string (MONGO_URI) is not set. Database will not be available.");
        return;
    }

    const conn = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });
}
module.exports = ConnectDB;