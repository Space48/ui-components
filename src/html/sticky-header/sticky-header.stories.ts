import {storiesOf} from '@storybook/html';
import {es6Class} from './../../../.storybook/utils/es6-class';
import {StickyHeader} from './sticky-header';
import './sticky-header.pcss';

storiesOf('Sticky Header', module)
  .addDecorator(es6Class('[data-stickyheader]', StickyHeader))
  .add('Default', () => {
    return `<div>${require('!html-loader?interpolate!./usage.html')}</div>`;
  });
