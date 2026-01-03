const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const ConnectDB = require('./src/db/db');

ConnectDB();

app.listen(3000, () => {
    console.log("App listening on port - 3000")
})

