const express = require('express');
const router = express.Router();
const Phrase = require('../models/phrase');


/* GET processes */
router.get('/', function (req, res, next) {
    Phrase.find({}, { '_id': 0, 'message': 1 }, (error, data) => {
        if (error) {
            console.error(error);
            let err = new Error(error);
            err.status = 400;
            return next(err);
        }
        res.json(data);
    })
});

module.exports = router;
