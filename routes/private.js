const express = require("express");
const router = express.Router();

const RecommendationController = require("../controllers/RecommendationController");
const UserController = require("../controllers/UserController");

// Verifying authorization of requests before processing them
const auth = require('../policies/auth.policy');
router.use((req, res, next) => auth(req, res, next));

module.exports = router;