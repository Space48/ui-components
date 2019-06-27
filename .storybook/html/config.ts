import {withA11y} from '@storybook/addon-a11y';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {addDecorator, addParameters, configure} from '@storybook/html';

const req = require.context('../../src/html', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(req);
}

// Setup a11y addon
addDecorator(withA11y);

// Setup viewports addon
addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

configure(loadStories, module);
