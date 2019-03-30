import React, { useState } from 'react';
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

export const MkoContext = React.createContext();
function MkoStory({ updateState, defaultValues = {}, children }) {
  const [state, setState] = useState(defaultValues);
  const ctx = [
    state,
    (o) =>
      setState((p) => {
        const newState = { ...p, ...o };
        updateState(newState);
        return newState;
      })
  ];

  return <MkoContext.Provider value={ctx}>{children}</MkoContext.Provider>;
}

export const withMko = makeDecorator({
  name: 'withMko',
  parameterName: 'mko',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters = {} }) => {
    const channel = addons.getChannel();
    const { style = {}, defaultValues = {} } = parameters;
    const styles = parameters.noStyle ? style : { ...centerStyles, ...style };

    channel.emit('mko/process', defaultValues);

    return (
      <GlobalStyleInjector className="with-mko" style={styles}>
        <MkoStory
          updateState={(values) => channel.emit('mko/process', values)}
          defaultValues={defaultValues}
        >
          {getStory(context)}
        </MkoStory>
      </GlobalStyleInjector>
    );
  }
});
