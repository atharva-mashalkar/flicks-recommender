const express = require('express');
const router = express.Router();
const RecommendationController = require("../controllers/RecommendationController");

router.get('/test', (req, res) => {
    const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    res.send(`<h1>Hello World!!! from ${environment}<h1>`);
});

router.get('/general-recommendations', RecommendationController.getGeneralRecommendations);

module.exports = router
