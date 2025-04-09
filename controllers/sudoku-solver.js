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
    return '';
  }

  validateCoordinate(coordinate) {
    const validCharacters = /[^A-I1-9/i]/;
    if (coordinate.match(validCharacters)) {
      throw new Error("Invalid coordinate");

    }
  }

  validateValue(value) {
    const validCharacters = /[^1-9]/;
    if (value.match(validCharacters)) {
      throw new Error("Invalid value");
    }
  }

  transformStringToMatrix(puzzleString, numOfColsAndRows) {
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

  checkRowPlacement(puzzleString, row, column, value) {
    const puzzleMatrix = this.transformStringToMatrix(puzzleString, 9);
    const rowIndex = this.transformRowIndicatorToIndex(row);
    const valueAsString = '' + value;

    //check the value not already found in row
    return !puzzleMatrix[rowIndex].includes(valueAsString);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const puzzleMatrix = this.transformStringToMatrix(puzzleString, 9);
    const colIndex = column - 1;
    const valueAsString = '' + value;
    const columnValues = puzzleMatrix.map(row => row[colIndex]);

    //check the value not already found in column
    return !columnValues.includes(valueAsString);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const puzzleMatrix = this.transformStringToMatrix(puzzleString, 9);
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
      if (!this.checkColPlacement(puzzleString, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('column');
        checkResult.conflict = conflicts;
      }
      if (!this.checkRowPlacement(puzzleString, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('row');
        checkResult.conflict = conflicts;
      }
      if (!this.checkRegionPlacement(puzzleString, row, column, value)) {
        checkResult.valid = false;
        conflicts.push('region');
        checkResult.conflict = conflicts;
      }
      return checkResult;
    } catch (err) {
      return { error: err.message };
    }
  }

  solve(puzzleString) {
  }
}

module.exports = SudokuSolver;

