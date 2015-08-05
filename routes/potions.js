var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/potions');
var Potions = db.get('potions');

router.get('/', function(req, res) {
    Potions.find({}, function(err, potions) {
        if (err) {
            res.send(err);
        }
        res.status(200).json(potions);
    })
});

router.post('/', function(req, res) {
    Potions.insert(req.body, function(err, potion) {
        if (err) {
            res.send(err);
        }
        res.status(201).json(potion);
    });
});

router.get('/:id', function(req, res) {
    Potions.findOne({_id: req.params.id}, function(err, potion) {
        if (err) {
            res.send(err)
        }
        res.status(200).json(potion)
    })
});

router.put('/:id', function(req, res) {
    Potions.findAndModify({_id: req.params.id}, req.body, function(err, potion) {
        if (err) {
            throw err
        }
        res.json(req.body)
    })
});

router.delete('/:id', function(req, res) {
    Potions.remove({_id: req.params.id}, function(err, potion) {
        if (err) {
            res.send(err)
        }
        res.status(200).json(potion)
    })
});

module.exports = router;