/*
    Imports
*/
                          require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser');

const { mainRouter }    = require('./routes/main.router');

/*
    Variables
*/
const port = process.env.PORT;
const host = process.env.HOST;
const server = express();
const db = require('./services/db');


/*
    Server 
*/
const init = () => {

    // MongoDB
    db.initClient()
    
    //Body-parser
    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({ extended: true }));

    // Router
    server.use('/', mainRouter);

    //Lunch
    server.listen(port, host, () => {
        console.log(`Server is running on ${host}:${port}`)
    });
};

init();
