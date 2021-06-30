const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

//Importing routes
const publicRoutes = require('./routes/public');

// Checking environment
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// Setting PORT
const PORT = process.env.PORT || 7000;

// Parsing the request bodys
app.use(cors());
app.use(express.json()); 

// Adding middlewares
// app.use(compression);
app.use(helmet());

// Declaring the routes
app.use('/public', publicRoutes);

// Staring the server
app.listen(PORT, () => {
    console.error(`NODE_ENV is set to ${environment} and the server is listening to Port ${PORT}.`);
});
