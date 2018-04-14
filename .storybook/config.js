import { configure } from '@storybook/react';

function loadStories() {
  require('../lib/stories/index.js');
  require('../lib/stories/alert.js');
  require('../lib/stories/autocomplete-input.js');

  require('../lib/stories/clearable-input.js');
  require('../lib/stories/loaders.js');
}

configure(loadStories, module);
