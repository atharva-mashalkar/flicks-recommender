const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connection = require('./config/connection');

//Importing routes
const publicRoutes = require('./routes/public');

// Checking environment
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// Setting PORT
const PORT = process.env.PORT || 7000;

//Allow CORS
app.use(cors());

//Connecting Mongodb Database
mongoose.connect(connection[environment].url,{useNewUrlParser : true , useCreateIndex: true , useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open'  , () => {
	console.log('MongoDB database connection established successfully');
});
mongoose.connection.on('error', (err) => {
	console.error(err);
	console.info('MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

// Parsing the request bodys
app.use(express.json()); 

// Adding few security headers
app.use(helmet());

// Declaring the routes
app.use('/public', publicRoutes);

// Staring the server
app.listen(PORT, () => {
    console.error(`NODE_ENV is set to ${environment} and the server is listening to Port ${PORT}.`);
});
