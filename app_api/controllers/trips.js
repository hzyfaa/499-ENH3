const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const User = require('../models/user');

// responses must include HTML status code and JSON message
// GET: /trips - list all the trips
const tripsList = async (req, res) => {
    // find all records
    const q = await Model.find({}).exec();

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
}

// GET: /trips/:tripCode - list single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec();
    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
}

// POST: /trips - add new trip - *auth*
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
        const q = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        if (!q) {
            // bad request;
            return res.status(400).json(err);
        } else {
            // created
            return res.status(201).json(q);
        };
    });
};

// PUT: /trips/:tripCode - Adds a new Trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true }).then((trip) => {
            if (!trip) {
                return res.status(404).send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            };
            res.send(trip);
        }).catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            }
            return res.status(500) // server error.json(err);
        });

    });
};

// DELETE: /trips/:tripCode - delete a trip by its code
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
        const q = await Trip.findOneAndDelete({ 'code': req.params.tripCode }).exec();
        if (!q) {
            // bad request;
            return res.status(400).json(err);
        } else {
            // removed
            return res.status(201).json(q);
        };
    });
};

// authenticate caller
const getUser = async (req, res, callback) => {
    const q = await User.findOne({ email: req.auth.email }).exec();
    if (!q) {
        return res.status(404).json({ "message": "User not found" });
    } else {
        callback(req, res, q.name);
    };

};

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };