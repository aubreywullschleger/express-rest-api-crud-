var app = require('./../app.js');
var db = require('monk')('localhost/swords');
var items = db.get('items');
var assert = require('assert');
var request = require('supertest');

before(function(done) {
    items.remove({}, function() {
        items.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
            done()
        });
    });
});


describe('POST api/swords', function () {
    it('creates a new resource', function (done) {
        request(app)
            .post('/api/swords')
            .send({title: 'from test'})
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    throw err;
                } else {
                    done()
                }
            })
    });
});

describe('PUT api/swords/:id', function () {
    it('updates a resource', function (done) {
        request(app)
            .put('/api/swords/55c050595ae876b6b79ad318')
            .send({title: 'from test'})
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                } else {
                    assert.equal(res.body.title, 'from test');
                    done()
                }
            })
    });
});