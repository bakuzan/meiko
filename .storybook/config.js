import { configure } from '@storybook/react';

function loadStories() {
  require('../lib/stories/index.js');
  require('../lib/stories/alert.js');
  require('../lib/stories/autocomplete-input.js');
  require('../lib/stories/chip-list-input.js');
  require('../lib/stories/clearable-input.js');
  require('../lib/stories/header.js');
  require('../lib/stories/loaders.js');
  require('../lib/stories/radio-button.js');
  require('../lib/stories/rating-control.js');
}

configure(loadStories, module);
