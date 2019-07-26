import {storiesOf} from '@storybook/html';
import {es6Class} from './../../../.storybook/utils/es6-class';
import {PlusMinus} from './plus-minus';
import './plus-minus.pcss';

storiesOf('Plus Minus', module)
  .addDecorator(es6Class('[data-plus-minus]', PlusMinus))
  .add('Default', () => {
    return `<div>${require('!html-loader?interpolate!./usage.html')}</div>`;
  });
