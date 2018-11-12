import { configure } from '@storybook/react';

function loadStories() {
  //require('./../src/js/containers/gridBoard/GridBoard/GridBoard.stories.js');
  require('./../src/js/containers/engines/BossPuzzle/BossPuzzle.stories');
  require('./../src/js/containers/engines/EightQueens/EightQueens.stories');
  require('./../src/js/containers/engines/KnightsTour/KnightsTour.stories');
}

configure(loadStories, module);