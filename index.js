const express = require('express');
const mongoose = require('mongoose');
const router = require('./router.js');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

bodyParser  = require( 'body-parser' )

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    console.log('IOOOOOOOHJADbjwbdjhwajh WOK');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const app = express();
mongoose.connect("mongodb+srv://admin:1@cluster0.gpxeh.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection

app.use(allowCrossDomain);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(router);

app.use(cors());


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Started at ${5000}`)
});