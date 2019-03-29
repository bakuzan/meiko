import React from 'react';
import addons from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';

const styles = {
  mkoPanel: { padding: '5px' }
};

class Mko extends React.Component {
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
  };

  onStoryChange = (storyId) => {
    console.log('%c [mko] story changed > ', 'color: #800080', storyId);
  };

  render() {
    const { active } = this.props;
    if (!active) {
      return null;
    }

    return (
      <section className="mko-panel" style={styles.mkoPanel}>
        <div>Mko Addon</div>
        <div>This addon panel is blank.</div>
      </section>
    );
  }
}

// Register the addon with a unique name.
addons.register('Mko', (api) => {
  // Also need to set a unique name to the panel.
  addons.addPanel('Mko/panel', {
    title: 'Mko',
    render: ({ active, key }) => <Mko key={key} api={api} active={active} />
  });
});
