const mongoose = require('mongoose');

function ConnectDB() {
    const conn = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err)
    });
}
module.exports = ConnectDB;