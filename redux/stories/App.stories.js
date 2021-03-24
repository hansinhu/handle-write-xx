import React from 'react';

import { App } from './App';

export default {
  title: 'Example/ReduxApp',
  component: App,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'App',
};