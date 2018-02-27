import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/FbBtn.story.js');
  require('../stories/Loader.story.js');
}

configure(loadStories, module);