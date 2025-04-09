const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { test } = require("mocha");

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('POST request to /api/check', () => {
        test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
            const expectedResponse = {
                valid: true
            };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'B3',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
            const expectedResponse = {
                valid: false,
                conflict: ['column']
            };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: 6
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
            const expectedResponse = {
                valid: false,
                conflict: ['column', 'row']
            };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
            const expectedResponse = {
                valid: false,
                conflict: ['column', 'row', 'region']
            };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1',
                    value: 5
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
            const expectedResponse = { "error": "Required field(s) missing" };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A1'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
            const expectedResponse = { "error": "Invalid characters in puzzle" };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'B3',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
            const expectedResponse = { "error": "Expected puzzle to be 81 characters long" };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '....9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'B3',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
            const expectedResponse = { "error": "Invalid coordinate" };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'Z3',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
            const expectedResponse = { "error": "Invalid value" };
            chai.request(server)
                .keepOpen()
                .post('/api/check')
                .type('form')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'B3',
                    value: 10
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, expectedResponse);
                    done();
                });
        });


    });
});

