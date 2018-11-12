import { configure } from '@storybook/react';

function loadStories() {
  require('./../src/js/containers/gridBoard/GridBoard/GridBoard.stories');
  require('./../src/js/containers/engines/BossPuzzle/BossPuzzle.stories');
  require('./../src/js/containers/engines/EightQueens/EightQueens.stories');
  require('./../src/js/containers/engines/KnightsTour/KnightsTour.stories');
  require('./../src/js/containers/engines/Sudoku/Sudoku.stories');
}

configure(loadStories, module);