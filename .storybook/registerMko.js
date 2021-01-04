import React from 'react';
import { addons, types } from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';

const styles = {
  mkoPanel: { padding: '5px' }
};

class Mko extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.on('mko/process', this.onAction);
    api.on(STORY_RENDERED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off('mko/process', this.onAction);
    api.off(STORY_RENDERED, this.onStoryChange);
  }

  onAction = (params) => {
    console.log('%c [mko] story action > ', 'color: #800080', params);
    this.setState({ params });
  };

  onStoryChange = (storyId) => {
    console.log('%c [mko] story changed > ', 'color: #800080', storyId);
  };

  render() {
    const { params } = this.state;
    const { active } = this.props;

    if (!active || !Object.keys(params).length) {
      return null;
    }

    const state = JSON.stringify(params, null, 2);

    return (
      <section className="mko-panel" style={styles.mkoPanel}>
        <div>Current State:</div>
        <pre>{state}</pre>
      </section>
    );
  }
}

// Register the addon with a unique name.
addons.register('Mko', (api) => {
  // Also need to set a unique name to the panel.
  addons.add('Mko/panel', {
    title: 'Mko',
    type: types.PANEL,
    render: ({ active, key }) => <Mko key={key} api={api} active={active} />
  });
});
