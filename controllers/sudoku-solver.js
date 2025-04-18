class SudokuSolver {

  validate(puzzleString) {
    const validCharacters = /[^1-9\.]/;
    const validPuzzleStringLength = 81;

    if (puzzleString.match(validCharacters)) {
      throw new Error("Invalid characters in puzzle");
    }
    if (!(puzzleString.length === validPuzzleStringLength)) {
      throw new Error("Expected puzzle to be 81 characters long");
    }
    return puzzleString;
  }

  getCoordinate(rowIndex, colIndex) {
    const rowIndicator = this.trnasformIndexToRowIndicator(rowIndex);
    return rowIndicator + ++colIndex;
  }

  validateCoordinate(coordinate) {
    console.log(`Check coordinate ${coordinate}`);
    const validCharacters = /^[A-I][1-9]/;
    if (coordinate.length > 2 || !coordinate.match(validCharacters)) {
      throw new Error("Invalid coordinate");
    }
  }

  validateValue(value) {
    const validCharacters = /[^1-9]/;
    value = '' + value;
    if (value.match(validCharacters)) {
      throw new Error("Invalid value");
    }
  }

  transformMatrixToString(matrix, numOfColsAndRows = 9) {
    let puzzleString = '', row, col;

    for (row = 0; row < numOfColsAndRows; row++) {
      for (col = 0; col < numOfColsAndRows; col++) {
        puzzleString += '' + matrix[row][col];
      }
    }
    return puzzleString;
  }

  transformStringToMatrix(puzzleString, numOfColsAndRows = 9) {
    const puzzleStringAsArray = puzzleString.split('');
    let matrix = [], row, col;

    for (row = 0, col = -1; row < puzzleStringAsArray.length; row++) {
      if (row % numOfColsAndRows === 0) {
        col++;
        matrix[col] = [];
      }
      matrix[col].push(puzzleStringAsArray[row]);
    }
    return matrix;
  }

  trnasformIndexToRowIndicator(row) {
    const indexToindicator = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
      4: 'E',
      5: 'F',
      6: 'G',
      7: 'H',
      8: 'I'
    };
    return indexToindicator[row];
  }

  transformRowIndicatorToIndex(rowIndicatorString) {
    const indicatorToIndex = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8
    };
    return indicatorToIndex[rowIndicatorString];
  }

  mapIndexToRegionIndices(index) {
    let indices = [];
    switch (index) {
      case 0:
      case 1:
      case 2:
        indices.push(0, 1, 2);
        break;
      case 3:
      case 4:
      case 5:
        indices.push(3, 4, 5);
        break;
      case 6:
      case 7:
      case 8:
        indices.push(6, 7, 8);
        break;

      default:
        break;
    };
    return indices;
  }

  checkRowPlacement(puzzleMatrix, row, column, value) {
    const rowIndex = this.transformRowIndicatorToIndex(row);
    const valueAsString = '' + value;

    //check the value not already found in row
    return !puzzleMatrix[rowIndex].includes(valueAsString);
  }

  checkColPlacement(puzzleMatrix, row, column, value) {
    const colIndex = column - 1;
    const valueAsString = '' + value;
    const columnValues = puzzleMatrix.map(row => row[colIndex]);

    //check the value not already found in column
    return !columnValues.includes(valueAsString);
  }

  checkRegionPlacement(puzzleMatrix, row, column, value) {
    const valueAsString = '' + value;
    const colIndex = column - 1;
    const rowIndex = this.transformRowIndicatorToIndex(row);

    const regionColIndices = this.mapIndexToRegionIndices(colIndex);
    const regionRowIndices = this.mapIndexToRegionIndices(rowIndex);
    let regionArray = [];
    regionRowIndices.forEach(rowIndex => {
      regionColIndices.forEach(colIndex => {
        regionArray.push(puzzleMatrix[rowIndex][colIndex]);
      });
    });

    return !regionArray.includes(valueAsString);
  }

  check(puzzleString, coordinate, value) {
    try {
      this.validate(puzzleString);
      this.validateCoordinate(coordinate);
      this.validateValue(value);
      let checkResult = { valid: true };
      let conflicts = [];
      const row = coordinate[0];
      const column = coordinate[1];
      const puzzleMatrix = this.transformStringToMatrix(puzzleString, 9);

      if (!this.checkColPlacement(puzzleMatrix, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('column');
        checkResult.conflict = conflicts;
      }
      if (!this.checkRowPlacement(puzzleMatrix, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('row');
        checkResult.conflict = conflicts;
      }
      if (!this.checkRegionPlacement(puzzleMatrix, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('region');
        checkResult.conflict = conflicts;
      }
      return checkResult;
    } catch (err) {
      return { error: err.message };
    }
  }

  findNextEmptyBox(puzzleAsArray, numOfColsAndRows = 9) {
    for (let row = 0; row < numOfColsAndRows; row++) {
      for (let col = 0; col < numOfColsAndRows; col++) {
        if (puzzleAsArray[row][col] === '.') {
          return {
            row: row,
            col: col
          };
        }
      }
    }
    //no empty box found
    return {
      row: -1,
      col: -1
    };
  }

  solveValidPuzzle(puzzleAsArray, numOfColsAndRows = 9) {
    const emptyBox = this.findNextEmptyBox(puzzleAsArray);

    if (emptyBox.row === -1) {
      //no empty boxes left, solution found
      return puzzleAsArray;
    }
    const coordinate = this.getCoordinate(emptyBox.row, emptyBox.col);

    //find value to fill empty box
    for (let value = 1; value <= numOfColsAndRows; value++) {
      const checkResult = this.check(this.transformMatrixToString(puzzleAsArray), coordinate, value);
      if (checkResult.valid) {
        puzzleAsArray[emptyBox.row][emptyBox.col] = value;
        this.solveValidPuzzle(puzzleAsArray);
      }
    }

    if (this.findNextEmptyBox(puzzleAsArray).row !== -1) {
      puzzleAsArray[emptyBox.row][emptyBox.col] = '.';
    }
    return puzzleAsArray;
  }

  isPuzzleSolved(puzzleAsArray, seachString = '.') {
    return !puzzleAsArray.some(row => row.includes(seachString));
  }

  solve(puzzleString) {
    try {
      this.validate(puzzleString);
      const solutionAsArray = this.solveValidPuzzle(this.transformStringToMatrix(puzzleString));
      if (this.isPuzzleSolved(solutionAsArray)) {
        return {
          solution: this.transformMatrixToString(solutionAsArray)
        };
      } else {
        return {
          error: 'Puzzle cannot be solved'
        };
      }
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = SudokuSolver;