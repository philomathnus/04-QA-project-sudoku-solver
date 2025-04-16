'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  const missingRequiredFields = { "error": "Required field(s) missing" };
  const missingRequiredField = { "error": "Required field missing" };

  const checkRequiredFields = (reqBody, action) => {
    return (action === 'solve') ? reqBody.puzzle : reqBody.puzzle && reqBody.coordinate && reqBody.value;
  };

  app.route('/api/check')
    .post((req, res) => {
      if (!checkRequiredFields(req.body, 'check')) {
        res.json(missingRequiredFields);
      } else {
        res.json(solver.check(req.body.puzzle, req.body.coordinate, req.body.value));
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!checkRequiredFields(req.body, 'solve')) {
        res.json(missingRequiredField);
      } else {
        res.json(solver.solve(req.body.puzzle));
      }      
    });
};
