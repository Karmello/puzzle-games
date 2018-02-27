import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/BossPuzzle.story.js');
  require('../stories/FbBtn.story.js');
  require('../stories/Loader.story.js');
}

configure(loadStories, module);