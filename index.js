const express = require('express');
const mongoose = require('mongoose');
const router = require('../SpiritCampAPI/router.js')

const app = express();
mongoose.connect("mongodb+srv://admin:1@cluster0.gpxeh.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection
app.use(express.json());

app.use(router)

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})