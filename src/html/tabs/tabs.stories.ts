import {storiesOf} from '@storybook/html';
import {es6Class} from './../../../.storybook/utils/es6-class';
import {Tabs} from './tabs';
import './tabs.pcss';

storiesOf('Tabs', module)
  .addDecorator(es6Class('[data-tabs]', Tabs))
  .add('Default', () => {
    return `<div>${require('!html-loader?interpolate!./usage.html')}</div>`;
  });
