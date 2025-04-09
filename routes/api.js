'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  const missingRequiredFields = { "error": "Required field(s) missing" };

  const checkRequiredFields = (reqBody) => {
    return reqBody.puzzle && reqBody.coordinate && reqBody.value;
  };

  app.route('/api/check')
    .post((req, res) => {
      if (!checkRequiredFields(req.body)) {
        res.json(missingRequiredFields);
      } else {
        res.json(solver.check(req.body.puzzle, req.body.coordinate, req.body.value));
      }
    });

  app.route('/api/solve')
    .post((req, res) => {

    });
};
