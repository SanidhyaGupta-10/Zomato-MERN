const app = require('./src/app');
const ConnectDB = require('./src/db/db');
const dotenv = require('dotenv');
dotenv.config();

ConnectDB();

app.listen(3000, () => {
    console.log("App listening on port - 300")
})

