// HTTP framework for handling requests
const express = require('express');
const app = express();
// DBMS Mysql
const mysql = require('mysql2');
// Cross Origin Resource Sharing
const cors = require('cors');
// Environment variable doc
const dotenv = require('dotenv');

// 
app.use(express.json());
app.use(cors());
dotenv.config();

// connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// Check if there is a connection
db.connect((err) =>{
    // If there is no connection
    if(err) return console.log("Error connecting to MYSQL");

        // If connection works
    console.log("Connected to MYSQL as id: ", db.threadId);
})

// Write your code here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data.ejs file is in views folder

app.get('/data', (req,res) => {
    
    // Retrieve data from database
    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retriving data')
        }
        else {
            // Display the records to the browser
    
            res.render('data', {results: results});
        }
    });
});
app.get('/data', (req,res) =>{
    db.query('SELECT * FROM providers', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retriving data')
        }
        else {
            // Display the records to the browser
    
            res.render('data', {results: results});
        }
    });
});
app.get('/data', (req,res) =>{
    db.query('SELECT first_name FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retriving data')
        }
        else {
            // Display the records to the browser
    
            res.render('data', {results: results});
        }
    });
});
app.get('/data', (req,res) =>{
    db.query('SELECT provider_specialty FROM providers', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retriving data')
        }
        else {
            // Display the records to the browser
    
            res.render('data', {results: results});
        }
    });
});
// here

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Sending a message to the browser
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });
});