import React from 'react';

import { storiesOf } from '@storybook/react';

import TextArea from './TextArea'


storiesOf('TextArea', module)
  .add('textarea with placeholder', () => <TextArea name="text" placeholder="Please enter any text"/>)

