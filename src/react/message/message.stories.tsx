import {storiesOf} from '@storybook/react';
import React from 'react';
import {Message} from './message';

const story = storiesOf('Message', module);

story.add('Error', () => (
  <Message type="error" text="Oops, Something went wrong" />
));
story.add('Success', () => (
  <Message type="success" text="Successfully added" />
));
story.add('Info', () => (
  <Message type="info" text="You might like to know..." />
));
