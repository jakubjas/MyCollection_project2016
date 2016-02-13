var Record = require('../models/record');
var express = require('express');
var router = express.Router();

// Retrieving all records
router.route('/records').get(function(req,res) {

    Record.find(function(err,records) {

        if (err) {
            return res.send(err);
        }

        res.json(records);

    });

});

// Creating a new record
router.route('/records').post(function(req,res) {

    var record = new Record(req.body);

    record.save(function(err) {

        if (err) {
            return res.send(err);
        }

        res.send({ message: 'Pozycja dodana' });

    });

});

// Updating a record
router.route('/records/:id').put(function(req,res) {

    Record.findOne({ _id: req.params.id }, function(err,record) {

        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            record[prop] = req.body[prop];
        }

        // save the record
        record.save(function (err) {

            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Pozycja zaktualizowana!' });

        });
    });

});


// Retrieving a record
router.route('/records/:id').get(function(req,res) {

    Record.findOne({ _id: req.params.id }, function (err, record) {

        if (err) {
            return res.send(err);
        }

        res.json(record);

    });

});

// Deleting a record
router.route('/records/:id').delete(function(req,res) {

    Record.remove({

        _id: req.params.id

    }, function (err, recipe) {

        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Pomyślnie usunięto' });

    });

});

module.exports = router;