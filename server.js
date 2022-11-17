require('dotenv').config()

// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

// Port
const PORT = process.env.PORT || 3000

// Database
const MONGODB_URI = process.env.MONGODB_URI

// connect to Mongo & Fix Depreciation Warnings from Mongoose
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
    );

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// use public folder for static assets
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Listener
app.listen(PORT, () => {
    console.log(`express is listening on: ${PORT}`)
})