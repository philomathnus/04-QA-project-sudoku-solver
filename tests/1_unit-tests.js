const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const { test, beforeEach, suite } = require('mocha');
const solver = new Solver();

suite('Unit Tests', () => {
    suite('Solver->validate', () => {
        test('Logic handles a valid puzzle string of 81 characters', () => {
            /*             const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
                        const expectedSolution = '"769235418851496372432178956174569283395842761628713549283657194516924837947381625';
                        const actualSolution = solver.validate(validPuzzleString);
                        assert.equal(actualSolution, expectedSolution); */
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
            assert.isTrue(solver.checkRowPlacement(validPuzzleString, 'A', 1, 3));
        });

        test('Logic handles an invalid row placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isFalse(solver.checkRowPlacement(validPuzzleString, 'A', 1, 9));
        });
    });

    suite('Solver->checkColPlacement', () => {
        test('Logic handles a valid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isTrue(solver.checkColPlacement(validPuzzleString, 'D', 2, 8));
        });

        test('Logic handles an invalid column placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isFalse(solver.checkColPlacement(validPuzzleString, 'D', 2, 4));
        });
    });

    suite('Solver->checkRegionPlacement', () => {
        test('Logic handles a valid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isTrue(solver.checkRegionPlacement(validPuzzleString, 'D', 4, 3));
        });

        test('Logic handles an invalid region (3x3 grid) placement', () => {
            const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isFalse(solver.checkRegionPlacement(validPuzzleString, 'E', 5, 7));
        });
    });
});
