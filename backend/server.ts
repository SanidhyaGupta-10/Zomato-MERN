import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';
import ConnectDB from './src/db/db';

ConnectDB();

app.listen(3000, () => {
    console.log("App listening on port - 3000")
})

