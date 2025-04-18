import dotenv from 'dotenv';

import app from './src/app.js';

import './src/rabbit/rabbit_consumer.js'


dotenv.config();
const port = process.env.PORT;


//Here we just add app so the routes run in the specified port

app.listen(port, () => {
    console.log(`users service is running on port: ${port}`)
});

