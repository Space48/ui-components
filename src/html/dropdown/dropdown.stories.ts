import {storiesOf} from '@storybook/html';
import {es6Class} from './../../../.storybook/utils/es6-class';
import {Dropdown} from './dropdown';
import './dropdown.pcss';

storiesOf('Dropdown', module)
  .addDecorator(es6Class('[data-dropdown]', Dropdown))
  .add('Default', () => {
    return `<div>${require('!html-loader?interpolate!./usage.html')}</div>`;
  });
