import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import { useGlobalStyles } from '../lib/_hooks/useGlobalStyles';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
};

function GlobalStyleInjector({ children, ...props }) {
  useGlobalStyles();
  return <div {...props}>{children}</div>;
}

export const withMko = makeDecorator({
  name: 'withMko',
  parameterName: 'mko',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    // Our simple API above simply sets the notes parameter to a string,
    // which we send to the channel
    channel.emit('mko/process', parameters);
    // we can also add subscriptions here using channel.on('eventName', callback);

    return (
      <GlobalStyleInjector className="with-mko" style={centerStyles}>
        {getStory(context)}
      </GlobalStyleInjector>
    );
  }
});
