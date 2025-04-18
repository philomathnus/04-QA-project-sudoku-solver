const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const { test, beforeEach, suite } = require('mocha');
const solver = new Solver();

suite('Unit Tests', () => {
    suite('Solver->validate', () => {
        test('Logic handles a valid puzzle string of 81 characters', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.doesNotThrow(() => solver.validate(validPuzzleString));
        });

        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
            const invalidPuzzleString = '..9..5.1.85.4....2432...*..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.throws(() => solver.validate(invalidPuzzleString), 'Invalid characters in puzzle');
        });

        test('Logic handles a puzzle string that is not 81 characters in length', () => {
            const puzzleStringTooShort = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const puzzleStringTooLong = '.......9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.throws(() => solver.validate(puzzleStringTooShort), 'Expected puzzle to be 81 characters long');
            assert.throws(() => solver.validate(puzzleStringTooLong), 'Expected puzzle to be 81 characters long');
        });
    });

    suite('Solver->checkRowPlacement', () => {
        test('Logic handles a valid row placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isTrue(solver.checkRowPlacement(validPuzzleMatrix, 'A', 1, 3));
        });

        test('Logic handles an invalid row placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isFalse(solver.checkRowPlacement(validPuzzleMatrix, 'A', 1, 9));
        });
    });

    suite('Solver->checkColPlacement', () => {
        test('Logic handles a valid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isTrue(solver.checkColPlacement(validPuzzleMatrix, 'D', 2, 8));
        });

        test('Logic handles an invalid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isFalse(solver.checkColPlacement(validPuzzleMatrix, 'D', 2, 4));
        });
    });

    suite('Solver->checkRegionPlacement', () => {
        test('Logic handles a valid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isTrue(solver.checkRegionPlacement(validPuzzleMatrix, 'D', 4, 3));
        });

        test('Logic handles an invalid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const validPuzzleMatrix = solver.transformStringToMatrix(validPuzzleString);
            assert.isFalse(solver.checkRegionPlacement(validPuzzleMatrix, 'E', 5, 7));
        });
    });


    suite('Solver->check', () => {
        test('Logic handles a valid row placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { valid: true };
            assert.deepEqual(solver.check(validPuzzleString, 'A1', 7), expectedReponse);
        });

        test('Logic handles an invalid row placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { 
                valid: false,
                conflict: ['row']
            };
            assert.deepEqual(solver.check(validPuzzleString, 'A4', 1), expectedReponse);
        });

        test('Logic handles a valid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { valid: true };
            assert.deepEqual(solver.check(validPuzzleString, 'G3', 3), expectedReponse);
        });

        test('Logic handles an invalid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { 
                valid: false,
                conflict: ['column']
            };
            assert.deepEqual(solver.check(validPuzzleString, 'H3', 9), expectedReponse);
        });

        test('Logic handles a valid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { valid: true };
            assert.deepEqual(solver.check(validPuzzleString, 'A2', 6), expectedReponse);
        });

        test('Logic handles an invalid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { 
                valid: false,
                conflict: ['region']
            };
            assert.deepEqual(solver.check(validPuzzleString, 'B3', 3), expectedReponse);
        });

        test('Invalid coordinate', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedReponse = { error: 'Invalid coordinate'};
            assert.deepEqual(solver.check(validPuzzleString, 'A10', 3), expectedReponse);
        });

        /*         test('Allow value already existing in coordinate, if it is valid', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedResponse = { valid: true };
            assert.deepEqual(solver.check(validPuzzleString, 'A3', 9), expectedResponse);
        }); */
    });

    suite('Solver->solve', () => {
        test('Valid puzzle strings pass the solver', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.property(solver.solve(validPuzzleString), "solution");
        });

        test('Invalid puzzle strings fail the solver', () => {
            const invalidPuzzleString = 'A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.property(solver.solve(invalidPuzzleString), "error");
        });

        test('Solver returns the expected solution for an incomplete puzzle', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            const expectedSolution = {
                solution: '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
            };
            assert.deepEqual(solver.solve(validPuzzleString), expectedSolution);
        });
    });
});
