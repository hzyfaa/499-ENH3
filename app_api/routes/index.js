const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({ secret: process.env.JWT_SECRET, userProperty: 'payload', algorithms: ["HS256"] });

// define route for trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// define route for tripsFindByCode
// * params: tripCode
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

// define route for login
router.route('/login')
    .post(authController.login);

// define route for registration
router.route('/register')
    .post(authController.register);

module.exports = router;