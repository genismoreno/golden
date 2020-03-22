const express = require('express');
const router = express.Router();
const Phrase = require('../models/phrase');


/* GET processes */
router.get('/', function (req, res, next) {
    Phrase.find({}, { '_id': 0, 'message': 1 })
        .then(data => {
            res.json(data.map(item => item.message));
        })
        .catch(error => {
            console.error(error);
            let err = new Error(error);
            err.status = 400;
            return next(err);
        });
    /*.catch(error => {
        console.error(error);
        let err = new Error(error);
        err.status = 400;
        return next(err);
    }).lean()*/


});

module.exports = router;
