const express = require('express');
const router = express.Router();
const RecommendationController = require("../controllers/RecommendationController");
const UserController = require("../controllers/UserController");

router.get('/test', (req, res) => {
    const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    res.send(`<h1>Hello World!!! from ${environment}<h1>`);
});

router.get('/general-recommendations', RecommendationController.getGeneralRecommendations);

router.post('/signup', UserController.registerUser);

module.exports = router
