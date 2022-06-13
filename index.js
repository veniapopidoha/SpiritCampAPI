const express = require('express');
const mongoose = require('mongoose');
const router = require('./router.js');
const PORT = process.env.PORT || 5000;

bodyParser  = require( 'body-parser' )

const app = express();
mongoose.connect("mongodb+srv://admin:1@cluster0.gpxeh.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(router)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Started at ${5000}`)
});