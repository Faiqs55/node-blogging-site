// IMPORT PACKAGE IMPORTS 
const express = require('express');
const path = require('path');

// VARIABLES AND CALLS 
const app = express();
const PORT = 5000;

// MIDDLEWARES 
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get('/', (req, res) => res.render('home'))

// LISTENING 
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));