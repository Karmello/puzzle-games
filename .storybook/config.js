import { configure } from '@storybook/react';

function loadStories() {
  //require('./../src/js/containers/gridBoard/GridBoard/GridBoard.stories.js');
  require('./../src/js/containers/engines/BossPuzzle/BossPuzzle.stories.js');
  require('./../src/js/containers/engines/EightQueens/EightQueens.stories.js');
}

configure(loadStories, module);