import {withA11y} from '@storybook/addon-a11y';
import {withInfo} from '@storybook/addon-info';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {addDecorator, addParameters, configure} from '@storybook/react';

const req = require.context('../../src/react/', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

// Setup a11y addon
addDecorator(withA11y);

// Setup info addon
addDecorator(
  withInfo({
    header: false,
    inline: false,
  }),
);

// Setup viewports addon
addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

configure(loadStories, module);
