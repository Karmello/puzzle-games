import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/FbBtn.story.js');
}

configure(loadStories, module);