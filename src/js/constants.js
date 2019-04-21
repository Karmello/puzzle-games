// @flow
export const C_AppTitle = 'Puzzle Games';

export const C_GridBoard = {
  minGridBoardElemSize: 50,
  offset: 75
};

export const C_BossPuzzle = {
  numOfImgs : 20,
  fontSizes: { '3': 40, '4': 30, '5': 22 },
  tileSizes: { '3': 150, '4': 125, '5': 100 }
};

export const C_EightQueens = {
  dimension:8,
  elementSize: 75,
  imgPaths: {
    queen: 'eight-queens/queen.png'
  }
};

export const C_KnightsTour = {
  elementSize: 75,
  imgPaths: {
    knight: 'knights-tour/knight.jpg',
    okArrow: 'knights-tour/ok_arrow.png'
  }
};

export const C_Sudoku = {
  dimension: 9,
  elementSize: 65,
  selectMaxValue: 9
};

export const C_Tetris = {
  dimension: { x: 10, y: 20 },
  elementSize: 35,
  minElemSize: 10
};
